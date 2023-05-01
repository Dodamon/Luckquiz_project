package com.luckquiz.grade.api.service;

import java.io.IOException;
import java.util.ArrayList;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.gson.Gson;
import com.luckquiz.grade.api.request.KafkaGradeRequest;
import com.luckquiz.grade.db.entity.Grade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GradeService {
	private final StringRedisTemplate redisTemplate;
	private final Gson gson;
	@KafkaListener(topics = "test_2", groupId = "test_group_1")
	@Transactional
	public void consume(KafkaGradeRequest message) {
		// KafkaGradeRequest gradeRequest = gson.fromJson(message, KafkaGradeRequest.class);
		System.out.println(message.getRoomId());
		// addGrades(message);
	}


	// public ArrayList<Grade> getGrades(){
	// 	ArrayList<Grade> grades = new ArrayList<Grade>();
	// 	ZSetOperations<String, Object> zSetOperations = redisTemplate.opsForZSet();
	// 	// zSetOperations.add("Key", "Value", 10);
	// 	// System.out.println(zSetOperations.range("ZKey",0,-1) ) ;
	//
	// 	zSetOperations.rangeByScore("ZKey",Double.NEGATIVE_INFINITY,Double.POSITIVE_INFINITY).forEach((ZSetOperations.TypedTuple e) -> grades.add((Grade)e.getValue()));
	// 	return grades;
	// }
	@Transactional
	public void addGrades(KafkaGradeRequest gradeRequest){
		String roomId = gradeRequest.getRoomId()+"p";
		Grade grade = new Grade();
		Double score = 0d;

		grade.setPlayerName(gradeRequest.getPlayerName());
		grade.setScore_pre(0);
		grade.setScore_now(0);
		grade.setRank_pre(0);
		grade.setRank_now(0);

		ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
		Boolean success = zSetOperations.add(roomId,gson.toJson(grade),score);
		System.out.println(success);
	}

	public Grade getGrade(String roomId, String name){
		ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
		Grade grade = gson.fromJson(zSetOperations.popMax(roomId).getValue(), Grade.class);
		System.out.println(grade);
		return grade;
	}
}
