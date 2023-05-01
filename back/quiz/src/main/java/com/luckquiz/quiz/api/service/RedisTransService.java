package com.luckquiz.quiz.api.service;

import com.google.api.client.json.Json;
import com.google.gson.Gson;
import com.luckquiz.quiz.api.response.TemplateDetailResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
@RequiredArgsConstructor
public class RedisTransService {
    private final StringRedisTemplate redisTemplate;
    private final TemplateService templateService;
    private Gson gson = new Gson();
    @Transactional
    public void redisTest(int templateId, int hostId) throws Exception{
        System.out.println("테스트 시작");
        // 템플릿 가져오기.
        TemplateDetailResponse templateDetailResponse = templateService.findTemplateDetail(templateId, hostId);
        final ValueOperations<String, String> stringStringValueOperations = redisTemplate.opsForValue();
        int temp = templateDetailResponse.getId();
        int host = templateDetailResponse.getHostId();
        String keyVal = temp+"-"+host;

        String value = gson.toJson(templateDetailResponse);
        stringStringValueOperations.set(keyVal ,value);

        final String room_id = stringStringValueOperations.get(keyVal);
        System.out.println(keyVal);
        System.out.println(room_id);


//        stringStringValueOperations.increment(keyVal);
//        final String room_id2 = stringStringValueOperations.get("room_id");
//        System.out.println(room_id2);
    }

}
