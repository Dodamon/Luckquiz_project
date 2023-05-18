package com.luckquiz.quizroom.api.controller;

import com.google.gson.Gson;
import com.luckquiz.quizroom.api.request.Grade;
import com.luckquiz.quizroom.api.request.KafkaGradeEndMessage;
import com.luckquiz.quizroom.api.request.QuizStartRequest;
import com.luckquiz.quizroom.api.response.*;
import com.luckquiz.quizroom.api.service.QuizService;
import com.luckquiz.quizroom.api.service.ToGradeProducer;
import com.luckquiz.quizroom.db.entities.QuizReport;
import com.luckquiz.quizroom.db.repository.QuizReportRepository;
import com.luckquiz.quizroom.message.GuestTurnEndMessage;
import com.luckquiz.quizroom.message.HostTurnEndMessage;
import com.luckquiz.quizroom.message.QuizStartMessage;
import com.luckquiz.quizroom.model.EnterUser;
import com.luckquiz.quizroom.model.NextMessage;
import com.luckquiz.quizroom.model.UserR;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Slf4j
public class GradingConsumerController {
    private final QuizReportRepository quizReportRepository;
    private  final Gson gson;
    private final SimpMessageSendingOperations sendingOperations;
    private  final StringRedisTemplate stringRedisTemplate;
    private final QuizService quizService;
    private final ToGradeProducer toGradeProducer;
    @KafkaListener(topics = "sign_to_quiz",groupId = "test2")
    public void messageListener(String in, @Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) String key) {
//        QuizStartRequest quizStartRequest = gson.fromJson(in, QuizStartRequest.class);
        System.out.println("컨슈머 들어오는 것 확인 키값 : " + key);
        switch (key){
            case "rollback_finish":
                log.info("롤백 끝났답니다. 롤백이 끝났으니, 퀴즈번호를 바꾸고 소켓으로 보내줘야합니다.");
                // 중요!!  만약 동시성 문제가 생기면은 quizNum의 변경은 grade서버에서 하는 것으로 바꿔야한다.
                RollbackFinishMessage rollbackFinishMessage = gson.fromJson(in,RollbackFinishMessage.class);
                //함수 분리하기;
                QGame result = quizService.nextQuizAfterRollback(rollbackFinishMessage);
                QuizStartMessage qsm = QuizStartMessage.builder()
                        .type("getQuizItem")
                        .getQuizItem(result)
                        .build();
                sendingOperations.convertAndSend("/topic/quiz/" + rollbackFinishMessage.getRoomId(), qsm);
                //퀴즈 다음페이지 넘기기.

                // 참가자들한테 메세지 뿌리기
                QGame toGuest = QGame.serveQgame(result);
                QuizStartMessage qsmG = new QuizStartMessage();
                if("emotion".equals(result.getGame())){
                    System.out.println("emotion 찍혔니?");
                    toGuest.setAnswer(result.getAnswer());
                    qsmG.setGetQuizItem(toGuest);
                    qsmG.setType("getQuizItem");
                }else {
                    qsmG.setGetQuizItem(toGuest);
                    qsmG.setType("getQuizItem");
                }

                QuizStartRequest quizStartRequest = QuizStartRequest.builder()
                        .hostId(rollbackFinishMessage.getHostId())
                        .roomId(rollbackFinishMessage.getRoomId())
                        .build();
                quizService.serveQuiz(qsmG,rollbackFinishMessage.getRoomId());
                toGradeProducer.quizStart(gson.toJson(quizStartRequest));
                break;
            case "grade_start":
                log.info("채점 시작했답니다. 퀴즈 끝나면 퀴즈 끝났다고 보내줘야합니다.");
                NextMessage quizStartRequest1 = gson.fromJson(in,NextMessage.class);
                //함수 분리하기;
                System.out.println("quiz start host Id "+quizStartRequest1.getHostId());
                System.out.println("room Id "+ quizStartRequest1.getRoomId());

                // 현재 퀴즈 보내주는 것 넣어야 한다.
                ValueOperations<String, String> StringValueOperations = stringRedisTemplate.opsForValue();
                String quiz = StringValueOperations.get(quizStartRequest1.getRoomId()+"");
                TemplateDetailResponse templateDetailResponse = gson.fromJson(quiz,TemplateDetailResponse.class);
                log.info("quiz Num:  "+templateDetailResponse.getQuizNum());
                QGame qGame = templateDetailResponse.getQuizList().get(templateDetailResponse.getQuizNum());
                qGame.setQuizNum(templateDetailResponse.getQuizNum());
                qGame.setQuizSize(templateDetailResponse.getQuizList().size());
                ToGradeStartMessage toGradeStartMessage = ToGradeStartMessage.builder()
                        .quizNum(templateDetailResponse.getQuizNum())
                        .hostId(quizStartRequest1.getHostId())
                        .roomId(quizStartRequest1.getRoomId())
                        .build();
                QuizStartMessage qsm2 = QuizStartMessage.builder()
                        .type("getQuizItem")
                        .getQuizItem(qGame)
                        .build();

                sendingOperations.convertAndSend("/topic/quiz/" + quizStartRequest1.getRoomId(), qsm2);

                // 참가자들한테 메세지 뿌리기
                QGame toGuest2 = QGame.serveQgame(qGame);
                QuizStartMessage qsmG2 = new QuizStartMessage();
                if("emotion".equals(qGame.getGame())){
                    System.out.println("emotion 찍혔니?");
                    toGuest2.setAnswer(qGame.getAnswer());
                    qsmG2.setGetQuizItem(toGuest2);
                    qsmG2.setType("getQuizItem");
                }else {
                    qsmG2.setGetQuizItem(toGuest2);
                    qsmG2.setType("getQuizItem");
                }
                quizService.serveQuiz(qsmG2,quizStartRequest1.getRoomId());
                break;
            case "grade_end":
                log.info("채점 끝났답니다. 결과 메시지를 보내주는 함수 구현해야 합니다.");

                //함수 분리하기;
                KafkaGradeEndMessage kafkaGradeEndMessage = gson.fromJson(in, KafkaGradeEndMessage.class);
                ValueOperations<String, String> StringValueOperations2 = stringRedisTemplate.opsForValue();
                String roomInfo = StringValueOperations2.get(kafkaGradeEndMessage.getRoomId().toString());
                TemplateDetailResponse roomInf = gson.fromJson(roomInfo,TemplateDetailResponse.class);
                HashOperations<String, String, String> hashOperations = stringRedisTemplate.opsForHash();

                System.out.println(kafkaGradeEndMessage.getRoomId());
                Map all = hashOperations.entries(kafkaGradeEndMessage.getRoomId()+"p");
                List<String> users = new ArrayList<>(all.values());
                List<Grade> userLList = new ArrayList<>();
                for(String user: users){
                    Grade a = gson.fromJson(user,Grade.class);
                    a.setQuizNum(roomInf.getQuizNum());
                    userLList.add(a);
                }
                //총합 점수가 적힌랭킹 데이터 추가
//                Set<ZSetOperations.TypedTuple<String>> rankingData = stringRedisTemplate.opsForZSet().rangeWithScores(kafkaGradeEndMessage.getRoomId()+"rank",0,-1);
                // 받은 랭킹데이터를 <유저 이름, 점수>의 HashMap으로 변경.
//                HashMap<String, Integer> rankingDataMap = rankingData.stream().collect(Collectors.toMap(data->gson.fromJson(data.getValue(), EnterUser.class).getSender() , data->data.getScore().intValue(),(a, b)->a,HashMap::new));
                LinkedHashMap<String, Integer> rankingData = kafkaGradeEndMessage.getRankingData();
                StringValueOperations2.append(kafkaGradeEndMessage.getRoomId()+"-quiz",gson.toJson(kafkaGradeEndMessage)+", ");
                Collections.sort(userLList);
                for(Grade gtemp :userLList){
                    UserTurnEndResponse userTurnEndResponse = new UserTurnEndResponse();
                    userTurnEndResponse.setScoreGet(gtemp.getScoreGet());
                    int rankDiff = gtemp.getRankNow() - gtemp.getRankPre();
                    if(rankDiff < 0 ){
                        userTurnEndResponse.setIsUp("false");
                    }else if(rankDiff == 0 || 0 == userTurnEndResponse.getQuizNum()){
                        userTurnEndResponse.setIsUp("same");
                    }else {
                        userTurnEndResponse.setIsUp("true");
                    }
                    userTurnEndResponse.setRankDiff(rankDiff);
                    userTurnEndResponse.setQuizNum(roomInf.getQuizNum());
                    System.out.println(gtemp.getRankNow());
                    userTurnEndResponse.setRankNow(gtemp.getRankNow());
                    userTurnEndResponse.setTotalScore(rankingData.get(gtemp.getPlayerName()));
                    userTurnEndResponse.setTotalRankNow(gtemp.getTotalRankNow());
                    userTurnEndResponse.setTotalRankPre(gtemp.getTotalRankPre());

                    GuestTurnEndMessage guestTurnEndMessage = GuestTurnEndMessage.builder()
                            .type("userTurnEndResponse")
                            .userTurnEndResponse(userTurnEndResponse)
                            .build();
                    sendingOperations.convertAndSend("/queue/quiz/"+kafkaGradeEndMessage.getRoomId()+"/"+gtemp.getPlayerName(),guestTurnEndMessage);
                }
                // 퀴즈가 끝나고 host가 받는 결과 메시지
                HostTurnEndMessage hostTurnEndMessage = HostTurnEndMessage.builder()
                        .type("userLList")
                        .userLList(userLList)
                        .answerStatistics(kafkaGradeEndMessage.getAnswerData())
                        .connectionCount(kafkaGradeEndMessage.getConnectionCount())
                        .correctCount(kafkaGradeEndMessage.getCorrectCount())
                        .correctRate(kafkaGradeEndMessage.getCorrectRate())
                        .solveCount(kafkaGradeEndMessage.getSolveCount())
                        .rankingData(rankingData)
                        .build();
                sendingOperations.convertAndSend("/topic/quiz/"+kafkaGradeEndMessage.getRoomId(),hostTurnEndMessage);
                break;
            default:
                break;
        }
//        log.info("gson은 신이다 : "+quizStartRequest.getRoomId());
    }
    // key값들
    // rollback_finish
    // grade_start
    // grade_end
//    @KafkaListener(topics = "sign_to_quiz",groupId = "test")
//    public void quizEnd(String in,@Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) String key){
//        if("grade_end".equals(key)){
//            GradeEndMessage gradeEndMessage = gson.fromJson(in,GradeEndMessage.class);
//            QuizReport quizReport = quizReportRepository.findQuizReportByPinNum(gradeEndMessage.getRoomId());
//        }
//        System.out.println("헬로 월드");
//    }
}
