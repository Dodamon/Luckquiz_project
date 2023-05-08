package com.luckquiz.quiz.api.controller;

import com.luckquiz.quiz.api.service.RedisTransService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
@Slf4j
@RequiredArgsConstructor
public class QuizRoomConsumerController {
    private final RedisTransService redisTransService;
    private final StringRedisTemplate stringRedisTemplate;
    @KafkaListener(topics = "server_message",groupId = "test",
            properties = {"key.deserializer=org.apache.kafka.common.serialization.StringDeserializer"})
    public void quizStart(ConsumerRecord<String , String> in) throws Exception{
        if("start".equals(in.key())){
            String value = in.value();
            UUID hostId = UUID.fromString(value.split(" ")[0]);
            int roomId = Integer.parseInt(value.split(" ")[1]);
            int templateId = Integer.parseInt(value.split(" ")[2]);
            redisTransService.quizRedisTrans(roomId,hostId,templateId);  // roomId 로
            redisTransService.roomTempTrans(roomId,hostId,templateId);
        }
    }

    @KafkaListener(topics = "server_message",groupId = "test",
            properties = {"key.deserializer=org.apache.kafka.common.serialization.StringDeserializer"})
    public void quizEnd(ConsumerRecord<String , String> in) throws Exception{
        if("end".equals(in.key())){
            String value = in.value();
            Integer roomId = Integer.parseInt(value);
            String roomInfo = stringRedisTemplate.opsForValue().get(roomId);


        }
    }
}
