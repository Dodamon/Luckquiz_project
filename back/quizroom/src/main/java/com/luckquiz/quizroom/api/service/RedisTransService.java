package com.luckquiz.quizroom.api.service;

import com.google.gson.Gson;
import com.luckquiz.quizroom.api.response.TemplateDetailResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RedisTransService {
    private final StringRedisTemplate redisTemplate;
    private Gson gson = new Gson();
    @Transactional
    public void redisTest(int templateId, int hostId) throws Exception{
        System.out.println("테스트 시작");
        // 템플릿 가져오기.
        final ValueOperations<String, String> stringStringValueOperations = redisTemplate.opsForValue();

//        String value = gson.toJson(templateDetailResponse);
//        stringStringValueOperations.set(keyVal ,value);

//        final String room_id = stringStringValueOperations.get(keyVal);

    }

}
