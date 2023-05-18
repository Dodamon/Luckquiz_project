package com.luckquiz.quiz.api.controller;

import com.google.gson.Gson;
import com.luckquiz.quiz.api.request.FinalRequest;
import com.luckquiz.quiz.api.request.Grade;
import com.luckquiz.quiz.api.request.KafkaGradeEndMessage;
import com.luckquiz.quiz.api.request.QGame;
import com.luckquiz.quiz.api.response.EnterUser;
import com.luckquiz.quiz.api.response.TemplateAndRoomId;
import com.luckquiz.quiz.api.response.TemplateDetailResponse;
import com.luckquiz.quiz.api.service.RedisTransService;
import com.luckquiz.quiz.common.exception.CustomException;
import com.luckquiz.quiz.common.exception.CustomExceptionType;
import com.luckquiz.quiz.config.RedisConfig;
import com.luckquiz.quiz.db.entity.*;
import com.luckquiz.quiz.db.repository.*;
import io.netty.util.internal.StringUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Controller
@Slf4j
@RequiredArgsConstructor
public class QuizRoomConsumerController {
    private final Gson gson;
    private final RedisTransService redisTransService;
    private final StringRedisTemplate stringRedisTemplate;
    private final RedisConfig redisConfig;
    private final TemplateRepository templateRepository;
    private final QuizRoomRepository quizRoomRepository;
    private final QuizReportRepository quizReportRepository;

    private final QuizGuestRepository quizGuestRepository;
    private final UserRepository userRepository;
    @Transactional
    @KafkaListener(topics = "server_message",groupId = "test2") // 여기 컨슈머고 지금 파이널 엔드 요청 오면 이걸 받아서 처리를 합니다. 여기서 이제 레디스에 있는 값을 마리아로 옮기면 됩니다.
    public void quizEnd(String in,@Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) String key) throws Exception {
        switch(key){
            case "start": {
                EnterUser u = new EnterUser();
                // 데이터 " "로 파싱
                String[] parsedData = in.split(" ");
                UUID hostId = UUID.fromString(parsedData[0]);
                int roomId = Integer.parseInt(parsedData[1]);
                int templateId = Integer.parseInt(parsedData[2]);
                Template template = templateRepository.findTemplateById(templateId).orElseThrow(()->new CustomException(CustomExceptionType.TEMPLATE_NOT_FOUND));
                ValueOperations<String, String> StringValueOperations = stringRedisTemplate.opsForValue();
                u.setSender(hostId.toString());

                StringValueOperations.append(roomId + "l", gson.toJson(u) + ", ");
                ValueOperations<String, Integer> IntegerValueOperations = redisConfig.redisIntegerTemplate().opsForValue();
                IntegerValueOperations.set(roomId + "cnt", 0);
                //3시간 뒤 삭제
                stringRedisTemplate.expire(roomId+"l",3L, TimeUnit.HOURS);
                stringRedisTemplate.expire(roomId+"cnt",3L, TimeUnit.HOURS);

                User host = userRepository.findUserById(hostId).orElseThrow(() -> new CustomException(CustomExceptionType.USER_NOT_FOUND));
                redisTransService.quizRedisTrans(roomId, hostId, templateId, host.getName());  // roomId 로


                System.out.println("consumer came");
                Template temp = templateRepository.findTemplateById(templateId).orElseThrow(() -> new CustomException(CustomExceptionType.TEMPLATE_NOT_FOUND)); // 유효성 검사
                QuizRoom quizRoom = new QuizRoom();
                if(quizRoomRepository.existsQuizRoomByPinNum(roomId)){
                    System.out.println("있니???????");
                    quizRoom = quizRoomRepository.findQuizRoomByPinNum(roomId).orElseThrow(()-> new CustomException(CustomExceptionType.ROOM_NOT_FOUND));
                    quizRoom.setCreatedTime(LocalDateTime.now());
                    quizRoom.setHostId(hostId);
                    quizRoom.setPinNum(roomId);
                    quizRoom.setTemplateName(temp.getName());
                    quizRoom.setTemplateId(templateId);
                }else {
                    System.out.println("없니?");
                    quizRoom.setCreatedTime(LocalDateTime.now());
                    quizRoom.setHostId(hostId);
                    quizRoom.setPinNum(roomId);
                    quizRoom.setTemplateName(temp.getName());
                    quizRoom.setTemplateId(templateId);
                    quizRoomRepository.save(quizRoom);
                }
                redisTransService.roomTempTrans(roomId, hostId, templateId,quizRoom.getId(),template.getName());
            }
                break;
            case "final_end": {
                log.info("final_end :: 퀴즈 방이 완전히 끝났습니다");
                //Zset => 랭킹 가져오기위함 template
                ZSetOperations<String, String> zSetOperations = stringRedisTemplate.opsForZSet();
                //Hash => 맞은 개수 등 가져오기 위한 template
                HashOperations<String, String, String> hashOperations = stringRedisTemplate.opsForHash();
                // in 에 UUID 인 hostId 가 들었고 , int (7자리) roomId 가 들어있읍니다.
                // in은 카프카에서 온 메시지 여기서 hostId, roomId 파싱;
                FinalRequest finalRequest = gson.fromJson(in, FinalRequest.class);
                UUID hostId = finalRequest.getHostId();
                Integer roomId = finalRequest.getRoomId();

                log.info("hostId : " + hostId);
                log.info("roomId(pinNum) : " + roomId);

                ValueOperations<String, String> StringValueOperations = stringRedisTemplate.opsForValue();
                User host = userRepository.findUserById(hostId).orElseThrow(() -> new CustomException(CustomExceptionType.USER_NOT_FOUND));
                String forRoomId = StringValueOperations.get(hostId.toString());
                log.info("forRoomId" + forRoomId);
                TemplateAndRoomId templateAndRoomId = gson.fromJson(forRoomId, TemplateAndRoomId.class);
                log.info("templateAndRoomId" + templateAndRoomId);
                QuizRoom quizRoom = quizRoomRepository.findQuizRoomById(templateAndRoomId.getRoomPk()).orElseThrow(() -> new CustomException(CustomExceptionType.ROOM_NOT_FOUND));


                quizRoom.setFinishedTime(LocalDateTime.now());
                quizRoom.setTemplateName(templateAndRoomId.getTemplateName());
                String quizInfo = StringValueOperations.get(roomId.toString());

                log.info("퀴즈방 처리 중간까지 성공 ");

                // 퀴즈 정보 가져오기
                TemplateDetailResponse templateDetailResponse = gson.fromJson(quizInfo,TemplateDetailResponse.class);
                int quizCnt = 0;
                int gameCnt = 0;
                log.info(templateDetailResponse.getHostNickName());
                log.info("퀴즈 Report 저장 시작 : 퀴즈 한개당 Report를 저장한다");
                for(QGame a : templateDetailResponse.getQuizList()){
                    Boolean isGame = true;
                    log.info("타입 점 보자고"+a.getType());
                    QuizReport quizReport = new QuizReport();
                    if(!StringUtil.isNullOrEmpty(a.getQuestion())){
                        isGame = false;
                        quizCnt ++;
                        quizReport.setQuestion(a.getQuestion());
                    }else {
                        isGame = true;
                        gameCnt ++;
                    }
                    quizReport.setQuizGameId(a.getId());
                    quizReport.setPinNum(quizRoom.getPinNum());
                    quizReport.setQuizRoomId(quizRoom.getId());
                    quizReportRepository.save(quizReport);
                }

                log.info("퀴즈 Report를 다시 조회한다");
                log.info("여기에서 오류 날거 같은데......");
                log.info("RoomPk:" + templateAndRoomId.getRoomPk());
                List<QuizReport> quizReport = quizReportRepository.findQuizReportsByQuizRoomId(templateAndRoomId.getRoomPk());
                // quiz report에 solvedcount 랑 correct count 더하기만 남음

                String quizCorInfo = StringValueOperations.get(roomId+"-quiz");
                log.info("quizCorInfo : " + quizCorInfo);
                String [] quizCorInfoList = quizCorInfo.split(", ");
                log.info(Arrays.toString(quizCorInfoList));

                int totalSubmitCnt = 0;
                int totalCorrectCnt = 0;
                // 지금 여기까지 옵니다
                for (int i = 0; i < quizCorInfoList.length; i++) {
                    KafkaGradeEndMessage kafkaGradeEndMessage = gson.fromJson(quizCorInfoList[i],KafkaGradeEndMessage.class);
                    // 한 문제 별 제출 수 와 총 정답 수를 담아보자.

                    log.info("CorrectCount : " + kafkaGradeEndMessage.getCorrectCount());
                    log.info("SubmitCount : " + kafkaGradeEndMessage.getSolveCount());

                    quizReport.get(i).setQuestion(templateDetailResponse.getQuizList().get(i).getQuestion());
                    quizReport.get(i).setCorrectCount(kafkaGradeEndMessage.getCorrectCount());
                    totalCorrectCnt += kafkaGradeEndMessage.getCorrectCount();
                    quizReport.get(i).setSubmitCount(kafkaGradeEndMessage.getSolveCount());
                    totalSubmitCnt += kafkaGradeEndMessage.getSolveCount();
                    quizReport.get(i).setUserId(hostId);
                }


                quizRoom.setCorrectCount(totalCorrectCnt);
                quizRoom.setSubmitCount(totalSubmitCnt);
                quizRoom.setQuizCount(quizCnt);
                quizRoom.setGameCount(gameCnt);
                // quiz_room 에 정보를 입력
                Map all = hashOperations.entries(finalRequest.getRoomId() + "p");


                log.info("퀴즈 게스트 정보 입력 시작");
                // quiz_guest 에 정보를 입력
                List<String> users = new ArrayList<>(all.values());
                int correctCnt = 0;
                for (String one : users) {
                    Grade g = gson.fromJson(one, Grade.class);
                    correctCnt += g.getCount();
                    QuizGuest qguest = QuizGuest.builder()
                            .guestNickname(g.getPlayerName())
                            .correctCount(g.getCount())
                            .pinNum(quizRoom.getPinNum())
                            .templateId(quizRoom.getTemplateId())
                            .hostId(hostId)
                            .score(g.getTotalScore())  // 참가자의 총점
                            .quizRoomId(quizRoom.getId())
                            .build();
                    if(!quizGuestRepository.existsByGuestNickname(g.getPlayerName())){
                        quizGuestRepository.save(qguest);
                    }
                    log.info("참가자---->"+qguest.getGuestNickname());
                }

                quizRoom.setCorrectCount(correctCnt);  // 모든 유저의 맞은 수 다 더한겨
                log.info("정답수가 잘 오니"+quizRoom.getCorrectCount());

                log.info("여기 어디야");
                int participant_count = 0;
                Set<ZSetOperations.TypedTuple<String>> rank = zSetOperations.reverseRangeByScoreWithScores(finalRequest.getRoomId() + "rank", 0, - 1);
                for (ZSetOperations.TypedTuple a : rank) {
                    EnterUser temp = gson.fromJson(a.getValue().toString(), EnterUser.class);
                    if (host.getName().equals(temp.getSender())) {
                        continue;
                    }
                    participant_count++;
                }
                quizRoom.setParticipantCount(participant_count);

                log.info("참여 전체 인원"+quizRoom.getParticipantCount());

                // 끝나고 삭제
                stringRedisTemplate.delete(roomId+"statics");
                stringRedisTemplate.delete(roomId+"rank");
                stringRedisTemplate.delete(roomId+"p");
                stringRedisTemplate.delete(roomId+"cnt");
                stringRedisTemplate.delete(roomId+"l");
                stringRedisTemplate.delete(roomId+"-quiz");
                stringRedisTemplate.delete(roomId.toString());

            }
                break;
            default:
                log.info("kafka key 값이 유효하지 않습니다.");
                break;

        }
    }
}
