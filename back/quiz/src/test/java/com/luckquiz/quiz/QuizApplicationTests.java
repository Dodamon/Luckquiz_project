package com.luckquiz.quiz;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

@SpringBootTest
class QuizApplicationTests {

//	@Autowired
//	private StringRedisTemplate redisTemplate;

	@Test
	void contextLoads() {
	}

//	@Test
//	public void redisTest() {
//		System.out.println("테스트 시작");
//		final ValueOperations<String, String> stringStringValueOperations = redisTemplate.opsForValue();
//
//		stringStringValueOperations.set("room_id","1234567");
//		final String room_id = stringStringValueOperations.get("room_id");
//		System.out.println(room_id);
//
//		stringStringValueOperations.increment("room_id");
//		final String room_id2 = stringStringValueOperations.get("room_id");
//		System.out.println(room_id2);
//	}


}
