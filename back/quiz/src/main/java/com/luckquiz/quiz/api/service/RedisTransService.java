package com.luckquiz.quiz.api.service;

import com.google.api.client.json.Json;
import com.google.gson.Gson;
import com.luckquiz.quiz.api.response.TemplateAndRoomId;
import com.luckquiz.quiz.api.response.TemplateDetailResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RedisTransService {
    private final StringRedisTemplate redisTemplate;
    private final TemplateService templateService;
    private Gson gson = new Gson();
    @Transactional
    // 퀴즈 정보를 전달한다.
    public void quizRedisTrans(int roomId, UUID hostId, int templateId, String hostNickName) throws Exception{
        System.out.println("레디스로 보내기 시작");
        // 템플릿 가져오기.
        TemplateDetailResponse templateDetailResponse = templateService.findTemplateDetail(templateId, hostId);
        templateDetailResponse.setQuizNum(0);
        templateDetailResponse.setHostNickName(hostNickName);
        final ValueOperations<String, String> stringStringValueOperations = redisTemplate.opsForValue();
        int temp = templateDetailResponse.getId();
        UUID host = templateDetailResponse.getHostId();
        String keyVal = roomId+"";

        String value = gson.toJson(templateDetailResponse);
        stringStringValueOperations.set(keyVal ,value);

        final String room_id = stringStringValueOperations.get(keyVal);
        System.out.println(keyVal);
        System.out.println(room_id);


//        stringStringValueOperations.increment(keyVal);
//        final String room_id2 = stringStringValueOperations.get("room_id");
//        System.out.println(room_id2);
    }

    @Transactional
    public void roomTempTrans(int roomId, UUID hostId, int templateId) throws Exception{
        System.out.println("템플릿과 룸아이디 조회");
        // 템플릿 가져오기.
        final ValueOperations<String, String> stringStringValueOperations = redisTemplate.opsForValue();
        String keyVal = hostId+"";
        TemplateAndRoomId val = TemplateAndRoomId.builder()
                .roomId(roomId)
                .templateId(templateId)
                .build();
        String value = gson.toJson(val);
        stringStringValueOperations.set(keyVal ,value);

        final String room_id = stringStringValueOperations.get(keyVal);
        System.out.println("template 과 roomId를 얻기 위해  "+keyVal);
    }

}
