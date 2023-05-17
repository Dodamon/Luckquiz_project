package com.luckquiz.quizroom.api.controller;



import com.google.gson.Gson;
import com.luckquiz.quizroom.api.request.EmotionSubmit;
import com.luckquiz.quizroom.api.request.FinalRequest;
import com.luckquiz.quizroom.api.request.Grade;
import com.luckquiz.quizroom.api.request.QuizStartRequest;
import com.luckquiz.quizroom.api.response.*;
import com.luckquiz.quizroom.api.service.*;
import com.luckquiz.quizroom.exception.CustomException;
import com.luckquiz.quizroom.exception.CustomExceptionType;
import com.luckquiz.quizroom.message.*;
import com.luckquiz.quizroom.model.*;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;

// 꾸글

import java.security.Principal;
import java.util.*;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MessageController {
    private final SimpMessageSendingOperations sendingOperations;
    private  final StringRedisTemplate stringRedisTemplate;
    private final Gson gson;
    private final ToGradeProducer toGradeProducer;
    private final ToQuizProducer toQuizProducer;
    private final QuizService quizService;
    //------------------------------------------------------------
    private final ClovarVisionService clovarVisionService;


//    @SubscribeMapping("/babo")
//    public void Callback(StompHeaderAccessor accessor, @Payload(required = false, value = "babo") String message){
//        String sessionId = accessor.getSessionId();
//        String subscriptionId = accessor.getSubscriptionId();
//        System.out.println("이름: "+message);
//        StompHeaderAccessor headers = StompHeaderAccessor.create(StompCommand.RECEIPT);
//        headers.setSessionId(sessionId);
//        headers.setSubscriptionId(subscriptionId);
//        headers.setReceiptId(accessor.getReceipt());
//        String subscribeMessage = "들어오신 것을 환영합니다.";
//        sendingOperations.convertAndSendToUser(accessor.getUser().getName(), headers.getDestination(), subscribeMessage+"님 접속을 환영합니다.", headers.toMap());
//    }
    //app/quiz/{roomId}/{name} 구독시 호은 topic/quiz/{roomiId}/{name} 메시지 날림
//    @SubscribeMapping("/{roomId}/{name}")
//    public void subscribeCallback(Principal principal, @DestinationVariable(value = "roomId") String roomId, @DestinationVariable(value = "name") String name){
////        String sessionId = accessor.getSessionId();
////        String subscriptionId = accessor.getSubscriptionId();
//        System.out.println("이름: "+name+" 방번호 : "+ roomId);
////        StompHeaderAccessor headers = StompHeaderAccessor.create(StompCommand.RECEIPT);
////        headers.setSessionId(sessionId);
////        headers.setSubscriptionId(subscriptionId);
////        headers.setReceiptId(accessor.getReceipt());
////        headers.setLeaveMutable(false);
//        String subscribeMessage = name+"님 접속을 환영합니다.";
////        System.out.println(accessor.getDestination());
////        System.out.println(accessor.getSessionId());
////        System.out.println(principal.getName());
////        sendingOperations.convertAndSendToUser(accessor.getUser().getName(), headers.getDestination(), subscribeMessage+"님 접속을 환영합니다.", headers.toMap());
//        String destination = "/quiz/"+roomId+"/"+name;
//        System.out.println(destination);
//        System.out.println(principal.getName());
////        sendingOperations.convertAndSendToUser(principal.getName(), "/queue"+destination, "세션 아이디 : "+"몰라");
////        sendingOperations.convertAndSend("/queue"+destination,subscribeMessage);
////        sendingOperations.convertAndSendToUser(principal.getName(), destination, "세션 아이디 : "+"몰라");
////        sendingOperations.convertAndSend(destination,subscribeMessage);
//        sendingOperations.convertAndSendToUser(principal.getName(), "/"+roomId+"/"+name, "세션 아이디 : "+"몰라");
////        sendingOperations.convertAndSendToUser(principal.getName(), "/app"+destination, "세션 아이디 : "+"몰라");
//        sendingOperations.convertAndSend("/topic"+destination,subscribeMessage);
//        //        return "왔다";
//    }


    @MessageMapping("/enter") // 호스트 아이디  host nickname 이랑 같은 애는 rank 랑 hash에 안넣어
    public void enter(QuizMessage message) {
        Grade grade = new Grade();
        HashOperations<String, String, String> hashOperations = stringRedisTemplate.opsForHash();
        ZSetOperations<String, String> zSetOperations = stringRedisTemplate.opsForZSet();
        ValueOperations<String, String> StringValueOperations = stringRedisTemplate.opsForValue();

        int roomId = message.getRoomId();
        grade.setPlayerName(message.getSender());
        grade.setPlayerImg(message.getImg());

        EnterUser enterUser = EnterUser.builder()
                .sender(message.getSender())
                .img(message.getImg())
                .build();
        StringValueOperations.append(roomId+"l",gson.toJson(enterUser)+", ");


        String roomIdString = roomId+"";
        // 레디스에서 퀴즈방 정보 가져옴. roomInfo 는 퀴즈방 정보
        //{"id":191,"name":"egg","hostId":"8c35436e-4ad9-4cd3-8c3f-1eb8f84db75b"
        // ,"quizList":[{"id":2100,"quiz":"","question":"","quizUrl":"","answer":"","answerList":[],"one":"","two":"","three":"","four":"","game":"wakeup","timer":15,"quizNum":0,"quizSize":1}]
        // ,"quizNum":0,"hostNickName":"Yejin Lee"}
        String roomInfo =StringValueOperations.get(roomIdString);
        //
        TemplateDetailResponse roomInf = gson.fromJson(roomInfo,TemplateDetailResponse.class);
        log.info("Enter MessageMapping Controller");
        log.info(roomInf.toString());
        log.info(message.getSender());
        log.info(roomInf.getHostNickName());
        if(!message.getSender().equals(roomInf.getHostNickName())) {  // 요놈이 걸러준다.
            hashOperations.put(roomId+"p", message.getSender(), gson.toJson(grade));
            Set<String> users = zSetOperations.range(roomId+"rank",0,-1);
            for(String user:users){
                EnterUser u= gson.fromJson(user,EnterUser.class);  // 입장하는 유저 중복을 거르는 로직
                if(message.getSender().equals(u.getSender())){
                    zSetOperations.remove(roomId+"rank",gson.toJson(u));
                }
            }
            zSetOperations.add(roomId+"rank",gson.toJson(enterUser),0);
        }


        String allList = StringValueOperations.get(roomId+"l",0,-1);
        String [] arr = allList.split(", ");
        List<EnterUser> result = new ArrayList();
        System.out.println("this hostId ---->" + roomInf.getHostId());
        for(String user: arr){
            EnterUser a = gson.fromJson(user,EnterUser.class);
            if(!roomInf.getHostNickName().equals(a.getSender()) && !roomInf.getHostId().toString().equals(a.getSender())){
                System.out.println("is guest");
                result.add(a);
            }
        }

        LinkedHashSet<EnterUser> li = new LinkedHashSet<EnterUser>(result);
        List<EnterUser> finList = new ArrayList<>();
        result.clear();
        result.addAll(li);
        for (int i = 0; i < result.size(); i++) {
            finList.add(result.get(i));
        }

        EnterGuestMessage egm = EnterGuestMessage.builder()
                .type("enterGuestList")
                .enterGuestList(finList)
                .build();

        sendingOperations.convertAndSend("/topic/quiz/" + message.getRoomId(), egm);
        quizService.serveEntry(egm,message.getRoomId());
    }

    @MessageMapping("/duplicheck")
    public void duplicheck(QuizMessage message) {
        ValueOperations<String, String> stringStringValueOperations = stringRedisTemplate.opsForValue();
        String allList = stringStringValueOperations.get(message.getRoomId()+"l",0,-1);
        String [] arr = allList.split(", ");
        String check = "true";
        for(String user: arr){
            EnterUser a = gson.fromJson(user,EnterUser.class);
            if(a.getSender().equals(message.getSender())){
                check = "false";
            }
        }
        Duplucheck d = new Duplucheck();
        d.setType("checkGuestName");
        d.setCheckGuestName(check);
        sendingOperations.convertAndSend("/queue/quiz/" + message.getRoomId()+"/"+message.getSender(), d);
    }

    @MessageMapping("/emotion/submit")
    public void emotionSubmit(EmotionSubmit message) throws  Exception{
        System.out.println("이미지 제출 시작합니다.");
        System.out.println("emotionType:   "+message.getEmotionResult().value+", confidence:    "+message.getEmotionResult().confidence + "    sender: "+message.getSender());
        toGradeProducer.emotion(gson.toJson(message));
    }

    @MessageMapping("/emotion")
    // 복사해서 임시랑 최종 맹글어야합니다.
    public void emotion(QuizMessage message) throws  Exception{
        System.out.println("분석 시작");
        try{
                byte[] decode = Base64.getDecoder().decode(message.getFile().split(",")[1]);
                if (decode.length >= 2097152) {
                    throw new CustomException(CustomExceptionType.FILE_TOO_LARGE);
                }
                EmotionResultMessage result = clovarVisionService.naverCheck(decode);
                result.setName(message.getSender());
                result.setRoomId(message.getRoomId());
                result.setQuizNum(message.getQuizNum());

                EmotionResponse emotionResponse = new EmotionResponse();
                emotionResponse.setType(result.getType());
                if (result.getResult().getFaces().isEmpty()) {
                    emotionResponse.setEmotionResult(null);
                } else {
                    log.info("성공");
                    log.info(result.getResult().getFaces().get(0).toString());
                    emotionResponse.setEmotionResult(EmotionResponse.EmotionResult.builder()
                            .emotion(result.getResult().getFaces().get(0).getEmotion())
                            .roi(result.getResult().getFaces().get(0).getRoi())
                            .build()
                    );
                }

                sendingOperations.convertAndSend("/queue/quiz/" + message.getRoomId() + "/" + message.getSender(), emotionResponse);
                // 채점결과 채점서버로 message 보내기
//                toGradeProducer.emotion(gson.toJson(result));
                log.info("제출 했습니다.");
        } catch (CustomException e){
            throw new CustomException(CustomExceptionType.NO_PICTURE_ERROR);
        }
//---------------------------------------------------------------------------------------------

        // 구글의 얼굴인식 api
//        GoogleVisionService googleVisionService = new GoogleVisionService(gson);
//        googleVisionService.googleCheck(decode);


//      System.out.println("submited:   "+message.getHostId()+", sender:    "+message.getSender());


//      Object resultRespone = gson.fromJson(result, Object.class);
//      sendingOperations.convertAndSend("/queue/quiz/" + message.getRoomId()+"/"+message.getSender(), result);
//        sendingOperations.convertAndSend("/queue/quiz/" + message.getRoomId()+"/"+message.getSender(), result);
    }



    @MessageMapping("/submit")
    public void submit(QuizMessage message) throws  Exception{
      System.out.println("submited:   "+message.getHostId()+", sender:    "+message.getSender());
      HashOperations<String, String, String> hashOperations = stringRedisTemplate.opsForHash();
      String a = hashOperations.get(message.getRoomId()+"p",message.getSender());
      Grade userInfo = gson.fromJson(a, Grade.class);
      message.setImg(userInfo.getPlayerImg());
      toGradeProducer.clientSubmit(gson.toJson(message));

    }

    // 퀴즈가 시작 요청이 오면 맨 처음 문제를 반환한다.
    // 이 때 quizNum 이 0으로 초기화된다.
    @MessageMapping("/quiz/start")
    public void start(NextMessage quizStartRequest) {
        QGame qGame = quizService.nextQuiz(quizStartRequest);
        ToGradeStartMessage toGradeStartMessage = ToGradeStartMessage.builder()
                .quizNum(qGame.getQuizNum())
                .hostId(quizStartRequest.getHostId())
                .roomId(quizStartRequest.getRoomId())
                .build();
        toGradeProducer.quizStart(gson.toJson(toGradeStartMessage));
    }


    @MessageMapping("/quiz/next")
    public void next(NextMessage nextMessage) {
        QGame result = quizService.nextQuiz(nextMessage);
        QuizStartRequest quizStartRequest = QuizStartRequest.builder()
                .quizNum(result.getQuizNum())
                .hostId(nextMessage.getHostId())
                .roomId(nextMessage.getRoomId())
                .build();
        toGradeProducer.quizStart(gson.toJson(quizStartRequest));
    }

    @MessageMapping("/turnEnd")
    public void quizEnd(QuizMessage message) {
        // 제출 끝나썽
        toGradeProducer.QuizEnd(gson.toJson(message));

        ZSetOperations<String, String> zSetOperations = stringRedisTemplate.opsForZSet();
        Set<ZSetOperations.TypedTuple<String>> all = zSetOperations.reverseRangeWithScores(message.getRoomId()+"statics",0,zSetOperations.size(message.getRoomId()+"rank")-1);
        List<ZSetOperations.TypedTuple<String>> rank = new ArrayList<>(all);
        List<TurnEndGraph> results = new ArrayList<>();

        for(ZSetOperations.TypedTuple<String> name : rank){
            TurnEndGraph turnEndGraph = TurnEndGraph.builder()
                    .answer(name.getValue())
                    .count(name.getScore().intValue())
                    .build();
            results.add(turnEndGraph);
        }
        TurnEndResponse tr = TurnEndResponse.builder()
                .type("quizEnd")
                .quizEnd(results)
                .build();
        GuestTurnEndSignalResponse guestTurnEndSignalResponse = GuestTurnEndSignalResponse.builder()
                .type("turnEndResponse")
                .turnEndResponse("success")
                .build();
        HostTurnEndSignalResponse hostTurnEndSignalResponse = HostTurnEndSignalResponse.builder()
                .type("hostTurnEndReponse")
                .hostTurnEndReponse("success")
                .build();
        // 턴엔드 잘됐다 신호 주고
        sendingOperations.convertAndSend("/topic/quiz/" + message.getRoomId(), hostTurnEndSignalResponse);
        // 결과 서브
        sendingOperations.convertAndSend("/topic/quiz/" + message.getRoomId(), tr);
        // 턴엔드 잘됐다 신호 주고
        quizService.serveTurnEndSignal(guestTurnEndSignalResponse,message.getRoomId());
        // 결과 서브
        quizService.serveTurnEnd(tr,message.getRoomId());
    }

    @MessageMapping("/quiz/currentCount")
    public void currentParticipent(CurrentParticipent currentParticipent){
        HashOperations<String, String, String> hashOperations = stringRedisTemplate.opsForHash();
        Map all = hashOperations.entries(currentParticipent.getRoomId()+"p");
        sendingOperations.convertAndSend("/topic/quiz/" + currentParticipent.getRoomId(), all.size());
    }

    @MessageMapping("/quiz/execute")
    public void execute(ShutDownRequest shutDownRequest){
        String hashKey = shutDownRequest.getRoomId()+"p";
        String zsetKey = shutDownRequest.getRoomId()+"rank";
        stringRedisTemplate.delete(shutDownRequest.getRoomId().toString());
        stringRedisTemplate.delete(hashKey);
        stringRedisTemplate.delete(zsetKey);
    }

    @MessageMapping("/quiz/rollback")
    public void rollBack(RollBackRequest rollBackRequest){
        if(rollBackRequest.getRoomId() != null) toGradeProducer.rollBack(gson.toJson(rollBackRequest));

    }

//    @MessageMapping("/quiz/middlerank")
//    public void middleRank(MiddleRank middleRank){
//        HashOperations<String, String, String> hashOperations = stringRedisTemplate.opsForHash();
//        Map all = hashOperations.entries(middleRank.getRoomId()+"p");
//        List<String> users = new ArrayList<>(all.values());
//        List<UserR> userLList = new ArrayList<>();
//        for(String user: users){
//            Grade a = gson.fromJson(user,Grade.class);
//            UserR u = new UserR();
//            u.setImg(a.getPlayerImg());
//            u.setSender(a.getPlayerName());
//            u.setRank(a.getRankNow());
//            userLList.add(u);
//        }
//        Collections.sort(userLList);
//        sendingOperations.convertAndSend("/topic/quiz/" + middleRank.getRoomId(), userLList);
//    }

    @MessageMapping("/quiz/ranking")
    public void totalRank (TotalRank totalRank){
        ZSetOperations<String, String> zSetOperations = stringRedisTemplate.opsForZSet();
        Set<ZSetOperations.TypedTuple<String>> all = zSetOperations.reverseRangeWithScores(totalRank.getRoomId()+"rank",0,zSetOperations.size(totalRank.getRoomId()+"rank")-1);
        List<ZSetOperations.TypedTuple<String>> rank = new ArrayList<>(all);
        List<UserR> result = new ArrayList<>();
        int rankNum = 1;
        for(ZSetOperations.TypedTuple<String> name : rank){
            EnterUser user = gson.fromJson(name.getValue(),EnterUser.class);
            UserR tempU = new UserR();
            tempU.setSender(user.getSender());
            tempU.setImg(user.getImg());
            tempU.setRank(rankNum);
            rankNum ++;
        }
        sendingOperations.convertAndSend("/topic/quiz/" + totalRank.getRoomId(),result);
        sendingOperations.convertAndSend("/queue/quiz/" + totalRank.getRoomId(),result);
    }
    @MessageMapping("/finalEnd")
    public void finalEnd(FinalRequest finalRequest){
        ZSetOperations<String, String> zSetOperations = stringRedisTemplate.opsForZSet();
        System.out.println(finalRequest.getRoomId());
        Set<ZSetOperations.TypedTuple<String>> all = zSetOperations.reverseRangeWithScores(finalRequest.getRoomId()+"rank",0,zSetOperations.size(finalRequest.getRoomId()+"rank")-1);

        List<ZSetOperations.TypedTuple<String>> rank = new ArrayList<>(all);
        List<UserR> result = new ArrayList<>();
        int rankNum = 1;
        for(ZSetOperations.TypedTuple<String> name : rank){
            EnterUser user = gson.fromJson(name.getValue(),EnterUser.class);
            UserR tempU = new UserR();
            System.out.println(tempU.getSender());
            tempU.setSender(user.getSender());
            tempU.setImg(user.getImg());
            tempU.setRank(rankNum);
            tempU.setScore(name.getScore().intValue());
            rankNum ++;
            result.add(tempU);
        }
        FinalResultMessage finalResultMessage = FinalResultMessage.builder()
                .type("finalResultList")
                .finalResultList(result)
                .build();
        for(ZSetOperations.TypedTuple<String> name : rank){
            EnterUser user = gson.fromJson(name.getValue(),EnterUser.class);
            sendingOperations.convertAndSend("/queue/quiz/" + finalRequest.getRoomId()+"/"+user.getSender(),finalResultMessage);
        }
        sendingOperations.convertAndSend("/topic/quiz/" + finalRequest.getRoomId(),finalResultMessage);
        toGradeProducer.FinalEnd(gson.toJson(finalRequest));
        toQuizProducer.FinalEnd(gson.toJson(finalRequest));
    }
//    @Scheduled(cron = "0/5 * * * * *" )
    public void submitCount(Integer roomId){

    }
}