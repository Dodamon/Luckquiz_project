package com.luckquiz.quiz.api.controller;

import com.google.gson.Gson;
import com.luckquiz.quiz.api.request.FinalRequest;
import com.luckquiz.quiz.api.response.EnterUser;
import com.luckquiz.quiz.api.service.RedisTransService;
import com.luckquiz.quiz.common.exception.CustomException;
import com.luckquiz.quiz.common.exception.CustomExceptionType;
import com.luckquiz.quiz.config.RedisConfig;
import com.luckquiz.quiz.db.entity.QuizGuest;
import com.luckquiz.quiz.db.entity.QuizRoom;
import com.luckquiz.quiz.db.entity.Template;
import com.luckquiz.quiz.db.entity.User;
import com.luckquiz.quiz.db.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.*;

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
            QuizRoom quizRoom = QuizRoom.builder()
                    .pinNum(roomId)
                    .template(temp)
                    .createdTime(LocalDateTime.now())
                    .build();
            quizRoomRepository.save(quizRoom);
        }
    }

    // 모든 단계가 끝이 났다.
    @KafkaListener(topics = "server_message",groupId = "test")
    public void quizEnd(String in,@Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) String key) throws Exception {
        if("final_end".equals(key)){
            FinalRequest finalRequest = gson.fromJson(in,FinalRequest.class);

            User user = userRepository.findUserById(finalRequest.getHostId()).orElseThrow(()->new CustomException(CustomExceptionType.USER_NOT_FOUND));

//          QuizReport quizReport = quizReportRepository.findQuizReportByPinNum(finalRequest.getRoomId());
            ZSetOperations<String, String> zSetOperations = stringRedisTemplate.opsForZSet();

            Set<ZSetOperations.TypedTuple<String>> rank = zSetOperations.reverseRangeByScoreWithScores(finalRequest.getRoomId()+"rank",0,zSetOperations.size(finalRequest.getRoomId()+"rank")-1);
            for(ZSetOperations.TypedTuple a : rank){
                EnterUser temp = gson.fromJson(a.getValue().toString(),EnterUser.class);
                if(!user.getName().equals(temp.getSender())){
                    QuizGuest quizGuest = QuizGuest.builder()
                            .guestNickname(temp.getSender())
                            .score(a.getScore()) // 점수

                            .build();

                }

            }
        }
    }
}
