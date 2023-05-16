package com.luckquiz.quiz.api.controller;

import com.google.gson.Gson;
import com.luckquiz.quiz.api.request.FinalRequest;
import com.luckquiz.quiz.api.request.Grade;
import com.luckquiz.quiz.api.request.QGame;
import com.luckquiz.quiz.api.response.EnterUser;
import com.luckquiz.quiz.api.response.TemplateDetailResponse;
import com.luckquiz.quiz.api.service.RedisTransService;
import com.luckquiz.quiz.common.exception.CustomException;
import com.luckquiz.quiz.common.exception.CustomExceptionType;
import com.luckquiz.quiz.config.RedisConfig;
import com.luckquiz.quiz.db.entity.*;
import com.luckquiz.quiz.db.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.common.protocol.types.Field;
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

    @KafkaListener(topics = "server_message",groupId = "test") // 여기 컨슈머고 지금 파이널 엔드 요청 오면 이걸 받아서 처리를 합니다. 여기서 이제 레디스에 있는 값을 마리아로 옮기면 됩니다.
    public void quizEnd(String in,@Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) String key) throws Exception {
        switch(key){
            case "start": {
                EnterUser u = new EnterUser();
                // 데이터 " "로 파싱
                String[] parsedData = in.split(" ");
                UUID hostId = UUID.fromString(parsedData[0]);
                int roomId = Integer.parseInt(parsedData[1]);
                int templateId = Integer.parseInt(parsedData[2]);

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
                //Zset => 랭킹 가져오기위함 template
                ZSetOperations<String, String> zSetOperations = stringRedisTemplate.opsForZSet();
                //Hash => 맞은 개수 등 가져오기 위한 template
                HashOperations<String, String, String> hashOperations = stringRedisTemplate.opsForHash();
                // in 에 UUID 인 hostId 가 들었고 , int (7자리) roomId 가 들어있읍니다.
                // in은 카프카에서 온 메시지 여기서 hostId, roomId 파싱;
                FinalRequest finalRequest = gson.fromJson(in, FinalRequest.class);
                UUID hostId = finalRequest.getHostId();
                Integer roomId = finalRequest.getRoomId();

                ValueOperations<String, String> StringValueOperations = stringRedisTemplate.opsForValue();

                User host = userRepository.findUserById(hostId).orElseThrow(() -> new CustomException(CustomExceptionType.USER_NOT_FOUND));
                QuizRoom quizRoom = quizRoomRepository.findQuizRoomByPinNum(roomId).orElseThrow(() -> new CustomException(CustomExceptionType.ROOM_NOT_FOUND));
                String quizInfo = StringValueOperations.get(roomId);

                // 퀴즈 정보 가져오기
                TemplateDetailResponse templateDetailResponse = gson.fromJson(quizInfo,TemplateDetailResponse.class);
                int quizCnt = 0;
                int gameCnt = 0;
                for(QGame a : templateDetailResponse.getQuizList()){
                    if("quiz".equals(a.getType())){
                        quizCnt ++;
                    }else {
                        gameCnt ++;
                    }
                    QuizReport quizReport = new QuizReport();
                    quizReport.setQuizGameId(a.getId());
                    quizReport.setQuestion(a.getQuestion());
                    quizReport.setPinNum(quizRoom.getPinNum());
                }

                quizRoom.setQuizCount(quizCnt);
                quizRoom.setGameCount(gameCnt);

                // quiz_room 에 정보를 입력
                Map all = hashOperations.entries(finalRequest.getRoomId() + "p");

                // quiz_guest 에 정보를 입력
                List<String> users = new ArrayList<>(all.values());
                int correctCnt = 0;
                for (String one : users) {
                    Grade g = gson.fromJson(one, Grade.class);
                    correctCnt += g.getCount();
                    QuizGuest qguest = QuizGuest.builder()
                            .correctCount(g.getCount())
                            .guestNickname(g.getPlayerName())
                            .totalCount(templateDetailResponse.getQuizList().size())
                            .pinNum(quizRoom.getPinNum())
                            .templateId(quizRoom.getTemplate().getId())
                            .quizRoomId(quizRoom.getId())
                            .build();
                    quizGuestRepository.save(qguest);
                }


                quizRoom.setCorrectCount(correctCnt);  // 모든 유저의 맞은 수 다 더한겨
                Set<ZSetOperations.TypedTuple<String>> rank = zSetOperations.reverseRangeByScoreWithScores(finalRequest.getRoomId() + "rank", 0, zSetOperations.size(finalRequest.getRoomId() + "rank") - 1);
                for (ZSetOperations.TypedTuple a : rank) {
                    EnterUser temp = gson.fromJson(a.getValue().toString(), EnterUser.class);
                    QuizGuest quizGuest = quizGuestRepository.findQuizGuestByPinNum(quizRoom.getPinNum()).orElseThrow(()->new CustomException(CustomExceptionType.QUIZGUEST_NOT_FOUND));
                    if(quizGuest.getGuestNickname().equals(temp.getSender())){
                        quizGuest.setScore(a.getScore());  // 게스트의 총점
                    }
                    if (host.getName().equals(temp.getSender())) {

                    }
                }

                // quiz_report 에 정보입력


            }
                break;
            default:
                log.info("kafka key 값이 유효하지 않습니다.");
                break;

        }
    }
}
