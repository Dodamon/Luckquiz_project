package com.luckquiz.quiz.api.controller;

import com.luckquiz.quiz.api.service.RedisTransService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
@Slf4j
@RequiredArgsConstructor
public class QuizRoomConsumerController {
    private final RedisTransService redisTransService;
    private final StringRedisTemplate stringRedisTemplate;
    @KafkaListener(topics = "server_message",groupId = "test")
    public void quizStart(String in, @Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) String key) throws Exception{
        System.out.println("came here?");
        System.out.println(key);
        if("start".equals(key)){
            System.out.println("start 로 왔니");
            UUID hostId = UUID.fromString(in.split(" ")[0]);
            int roomId = Integer.parseInt(in.split(" ")[1]);
            int templateId = Integer.parseInt(in.split(" ")[2]);
            System.out.println(templateId);
            System.out.println(templateId + "    roomId: "+roomId + "    hostId: "+hostId);
            redisTransService.quizRedisTrans(roomId,hostId,templateId);  // roomId 로
            redisTransService.roomTempTrans(roomId,hostId,templateId);
        }
    }

    @KafkaListener(topics = "server_message",groupId = "test")
    public void quizEnd(String in,@Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) String key) throws Exception{
        if("end".equals(key)){
            Integer roomId = Integer.parseInt(in);
            String roomInfo = stringRedisTemplate.opsForValue().get(roomId);


        }
    }
}
