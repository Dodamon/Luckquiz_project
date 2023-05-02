package com.luckquiz.grade.api.service;

import java.io.IOException;
import java.util.ArrayList;

import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.gson.Gson;
import com.luckquiz.grade.api.request.KafkaGradeRequest;
import com.luckquiz.grade.db.entity.Grade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@Transactional(readOnly = true)
public class GradeService {
	private final StringRedisTemplate redisTemplate;
	private final Gson gson;
	HashOperations<String, String, String> hashOperations;
	ZSetOperations<String, String> zSetOperations;
	public GradeService(StringRedisTemplate stringRedisTemplate, Gson gson){
		this.redisTemplate = stringRedisTemplate;
		this.gson = gson;
		this.hashOperations = stringRedisTemplate.opsForHash();
		this.zSetOperations = stringRedisTemplate.opsForZSet();
	}
	@Transactional
	public void grade(KafkaGradeRequest gradeRequest){
		String roomId = gradeRequest.getRoomId();
		Grade grade = new Grade();
		Double score = 0d;
		grade.setPlayerName(gradeRequest.getPlayerName());
		grade.setScore_get(0);
		grade.setRank_pre(0);
		grade.setRank_now(0);
		//해쉬 현재 점수, 순위 정보
		hashOperations.put(roomId+"p", gradeRequest.getPlayerName(), gson.toJson(grade));
		// 랭킹 정보
		zSetOperations.add(roomId+"rank",gradeRequest.getPlayerName(),score);
	}



	// @KafkaListener(topics = "inter_server", groupId = "inter_server")
	// @Transactional
	// public void consume2(KafkaGradeRequest message, @Header(KafkaHeaders.RECEIVED_TOPIC) String topic, @Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) String key) {
	// 	// KafkaGradeRequest gradeRequest = gson.fromJson(message, KafkaGradeRequest.class);
	// 	System.out.println(key+"확인"+topic);
	// 	addGrades(message);
	// }
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
		String roomId = gradeRequest.getRoomId();
		Grade grade = new Grade();
		Double score = 0d;

		grade.setPlayerName(gradeRequest.getPlayerName());
		grade.setScore_get(0);
		grade.setRank_pre(0);
		grade.setRank_now(0);
		//해쉬 현재 점수, 순위 정보
		hashOperations.put(roomId+"p", gradeRequest.getPlayerName(), gson.toJson(grade));
		// 랭킹 정보
		zSetOperations.add(roomId+"rank",gradeRequest.getPlayerName(),score);
	}

	public Grade getGrade(String roomId, String name){
		Grade grade = gson.fromJson(zSetOperations.popMax(roomId).getValue(), Grade.class);
		System.out.println(grade);
		return grade;
	}

	public void rollback(String roomId) {
		zSetOperations.range(roomId+"rank",0,-1);
		hashOperations.entries(roomId+"p");
	}

	public void quizEnd(String roomId) {

	}

	public void quizStart(String roomId) {

	}
}
