package com.luckquiz.quizroom.api.controller;

import com.google.gson.Gson;
import com.luckquiz.quizroom.api.request.Grade;
import com.luckquiz.quizroom.api.request.QuizStartRequest;
import com.luckquiz.quizroom.api.response.GradeEndMessage;
import com.luckquiz.quizroom.api.response.UserTurnEndResponse;
import com.luckquiz.quizroom.db.entities.QuizReport;
import com.luckquiz.quizroom.db.repository.QuizReportRepository;
import com.luckquiz.quizroom.model.UserR;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
public class GradingConsumerController {
    private final QuizReportRepository quizReportRepository;
    private  final Gson gson;
    private final SimpMessageSendingOperations sendingOperations;
    private  final StringRedisTemplate stringRedisTemplate;

    @KafkaListener(topics = "sign_to_quiz",groupId = "test")
    public void messageListener(String in, @Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) String key) {
//        QuizStartRequest quizStartRequest = gson.fromJson(in, QuizStartRequest.class);
        System.out.println("컨슈머 들어오는 것 확인 키값 : " + key);
        switch (key){
            case "rollback_finish":
                log.info("롤백 끝났답니다.");
                @Getter
                @Setter
                class KafkaRollbackFinishMessage{
                    private Integer roomId;
                }
                KafkaRollbackFinishMessage kafkaRollbackFinishMessage = gson.fromJson(in,KafkaRollbackFinishMessage.class);
                //함수 분리하기;

                break;
            case "grade_start":
                log.info("채점 시작했답니다. 퀴즈 끝나면 퀴즈 끝났다고 보내줘야합니다.");
                @Getter
                @Setter
                class KafkaGradeStartMessage{
                    private Integer roomId;
                }
                KafkaGradeStartMessage kafkaGradeStartMessage = gson.fromJson(in,KafkaGradeStartMessage.class);
                //함수 분리하기;

                break;
            case "grade_end":
                log.info("채점 끝났답니다. 결과 메시지를 보내주는 함수 구현해야 합니다.");
                @Getter
                @Setter
                class KafkaGradeEndMessage{
                    private Integer roomId;
                    private Integer count;
                    private Integer solvedCount;
                    private Integer quizNum;
                }
                //함수 분리하기;
                KafkaGradeEndMessage kafkaGradeEndMessage = gson.fromJson(in, KafkaGradeEndMessage.class);
                HashOperations<String, String, String> hashOperations = stringRedisTemplate.opsForHash();
                Map all = hashOperations.entries(kafkaGradeEndMessage.getRoomId()+"p");
                List<String> users = new ArrayList<>(all.values());
                List<Grade> userLList = new ArrayList<>();
                for(String user: users){
                    Grade a = gson.fromJson(user,Grade.class);
                    userLList.add(a);
                }
                Collections.sort(userLList);
                for(Grade gtemp :userLList){
                    UserTurnEndResponse userTurnEndResponse = new UserTurnEndResponse();
                    userTurnEndResponse.setScoreGet(gtemp.getScoreGet());
                    int rankDiff = gtemp.getRankNow() - gtemp.getRankPre();
                    if(rankDiff < 0 ){
                        userTurnEndResponse.setIsUp("false");
                    }else if(rankDiff == 0){
                        userTurnEndResponse.setIsUp("same");
                    }else {
                        userTurnEndResponse.setIsUp("true");
                    }
                    userTurnEndResponse.setRankDiff(rankDiff);
                    sendingOperations.convertAndSend("/queue/quiz/"+kafkaGradeEndMessage.getRoomId()+"/"+gtemp.getPlayerName(),userTurnEndResponse);
                }
                sendingOperations.convertAndSend("/topic/quiz/"+kafkaGradeEndMessage.getRoomId(),userLList);

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
