package com.luckquiz.quiz.api.controller;

import com.google.gson.Gson;
import com.luckquiz.quiz.api.response.EnterUser;
import com.luckquiz.quiz.api.service.RedisTransService;
import com.luckquiz.quiz.common.exception.CustomException;
import com.luckquiz.quiz.common.exception.CustomExceptionType;
import com.luckquiz.quiz.config.RedisConfig;
import com.luckquiz.quiz.db.entity.Template;
import com.luckquiz.quiz.db.repository.QuizReportRepository;
import com.luckquiz.quiz.db.repository.QuizRoomRepository;
import com.luckquiz.quiz.db.repository.TemplateRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Controller;
import java.util.UUID;

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
    @KafkaListener(topics = "server_message",groupId = "test")
    public void quizStart(String in, @Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) String key) throws Exception{
        if("start".equals(key)){
            EnterUser u = new EnterUser();
            System.out.println("start 로 왔니");
            UUID hostId = UUID.fromString(in.split(" ")[0]);
            int roomId = Integer.parseInt(in.split(" ")[1]);
            int templateId = Integer.parseInt(in.split(" ")[2]);
            ValueOperations<String, String> StringValueOperations = stringRedisTemplate.opsForValue();
            u.setSender(hostId.toString());
            u.setImg(0);
            StringValueOperations.append(roomId+"l",gson.toJson(u)+", ");
            ValueOperations<String, Integer> IntegerValueOperations = redisConfig.redisIntegerTemplate().opsForValue();
            IntegerValueOperations.set(roomId+"cnt",0);
            System.out.println(templateId);
            System.out.println(templateId + "    roomId: "+roomId + "    hostId: "+hostId);
            redisTransService.quizRedisTrans(roomId,hostId,templateId);  // roomId 로
            redisTransService.roomTempTrans(roomId,hostId,templateId);

            Template temp = templateRepository.findTemplateById(templateId).orElseThrow(()->new CustomException(CustomExceptionType.TEMPLATE_NOT_FOUND));
        }
    }
}
