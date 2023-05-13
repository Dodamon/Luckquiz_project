package com.luckquiz.quizroom.api.controller;

import com.google.gson.Gson;
import com.luckquiz.quizroom.api.request.QuizStartRequest;
import com.luckquiz.quizroom.api.response.GradeEndMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class GradingConsumerController {
    private  final Gson gson;
    @KafkaListener(topics = "sign_to_quiz",groupId = "test")
    public void messageListener(String in) {
        QuizStartRequest quizStartRequest = gson.fromJson(in, QuizStartRequest.class);
        log.info("gson은 신이다 : "+quizStartRequest.getRoomId());
    }

    @KafkaListener(topics = "sign_to_quiz",groupId = "test")
    public void quizEnd(String in,@Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) String key) throws Exception{
        if("grade_end".equals(key)){
            GradeEndMessage gem = gson.fromJson(in,GradeEndMessage.class);

            Integer roomId = Integer.parseInt(in);

        }
    }
}
