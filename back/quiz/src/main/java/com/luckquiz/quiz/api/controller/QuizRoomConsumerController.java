package com.luckquiz.quiz.api.controller;

import com.google.gson.Gson;
import com.luckquiz.quiz.api.request.FinalRequest;
import com.luckquiz.quiz.api.request.Grade;
import com.luckquiz.quiz.api.response.EnterUser;
import com.luckquiz.quiz.api.service.RedisTransService;
import com.luckquiz.quiz.common.exception.CustomException;
import com.luckquiz.quiz.common.exception.CustomExceptionType;
import com.luckquiz.quiz.config.RedisConfig;
import com.luckquiz.quiz.db.entity.*;
import com.luckquiz.quiz.db.repository.*;
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

    @KafkaListener(topics = "server_message",groupId = "test") // 여기 컨슈머고 지금 파이널 엔드 요청 오면 이걸 받아서 처리를 합니다. 여기서 이제 레디스에 있는 값을 마리아로 옮기면 됩니다.
    public void quizEnd(String in,@Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) String key) throws Exception {
        switch(key){
            case "start": {
                EnterUser u = new EnterUser();
                UUID hostId = UUID.fromString(in.split(" ")[0]);
                int roomId = Integer.parseInt(in.split(" ")[1]);
                int templateId = Integer.parseInt(in.split(" ")[2]);

                ValueOperations<String, String> StringValueOperations = stringRedisTemplate.opsForValue();
                u.setSender(hostId.toString());

                StringValueOperations.append(roomId + "l", gson.toJson(u) + ", ");
                ValueOperations<String, Integer> IntegerValueOperations = redisConfig.redisIntegerTemplate().opsForValue();
                IntegerValueOperations.set(roomId + "cnt", 0);

                User host = userRepository.findUserById(hostId).orElseThrow(() -> new CustomException(CustomExceptionType.USER_NOT_FOUND));
                redisTransService.quizRedisTrans(roomId, hostId, templateId, host.getName());  // roomId 로
                redisTransService.roomTempTrans(roomId, hostId, templateId);

                System.out.println("consumer came");
                Template temp = templateRepository.findTemplateById(templateId).orElseThrow(() -> new CustomException(CustomExceptionType.TEMPLATE_NOT_FOUND));
                QuizRoom quizRoom = QuizRoom.builder()
                        .pinNum(roomId)
                        .template(temp)
                        .hostId(hostId)
                        .createdTime(LocalDateTime.now())
                        .build();
                quizRoomRepository.save(quizRoom);
            }
                break;
            case "final_end": {
                ZSetOperations<String, String> zSetOperations = stringRedisTemplate.opsForZSet();
                HashOperations<String, String, String> hashOperations = stringRedisTemplate.opsForHash();
                // in 에 UUID 인 hostId 가 들었고 , int (7자리) roomId 가 들어있읍니다.
                FinalRequest finalRequest = gson.fromJson(in, FinalRequest.class);
                UUID hostId = finalRequest.getHostId();
                Integer roomId = finalRequest.getRoomId();


                User user = userRepository.findUserById(finalRequest.getHostId()).orElseThrow(() -> new CustomException(CustomExceptionType.USER_NOT_FOUND));
//                QuizRoom room = quizRoomRepository.getReferenceById();


                        Map all = hashOperations.entries(finalRequest.getRoomId() + "p");

                List<String> users = new ArrayList<>(all.values());
                for (String one : users) {
                    Grade g = gson.fromJson(one, Grade.class);
                    QuizGuest qguest = QuizGuest.builder()
                            .correctCount(g.getCount())
                            .guestNickname(g.getPlayerName())
                            .build();
                }
                Set<ZSetOperations.TypedTuple<String>> rank = zSetOperations.reverseRangeByScoreWithScores(finalRequest.getRoomId() + "rank", 0, zSetOperations.size(finalRequest.getRoomId() + "rank") - 1);
                for (ZSetOperations.TypedTuple a : rank) {
                    EnterUser temp = gson.fromJson(a.getValue().toString(), EnterUser.class);
                    if (user.getName().equals(temp.getSender())) {

                    }
                }
            }
                break;
            default:
                break;

        }
    }
}
