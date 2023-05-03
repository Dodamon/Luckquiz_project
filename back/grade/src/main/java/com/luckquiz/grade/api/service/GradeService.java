package com.luckquiz.grade.api.service;

import java.util.Map;
import java.util.Set;

import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.luckquiz.grade.api.request.KafkaGradeRequest;
import com.luckquiz.grade.api.response.TemplateDetailResponse;
import com.luckquiz.grade.api.response.TemplateInfoResponse;
import com.luckquiz.grade.config.KafkaProducer;
import com.luckquiz.grade.db.entity.Grade;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class GradeService {
	private final StringRedisTemplate redisTemplate;
	private final Gson gson;
	private final KafkaProducer kafkaProducer;
	HashOperations<String, String, Grade> hashOperations;
	ZSetOperations<String, String> zSetOperations;
	ValueOperations<String,Integer> valueOperations;


	public GradeService(StringRedisTemplate stringRedisTemplate, Gson gson, KafkaProducer kafkaProducer, RedisTemplate<String, Integer> redisTemplate){
		this.redisTemplate = stringRedisTemplate;
		this.gson = gson;
		this.hashOperations = stringRedisTemplate.opsForHash();
		this.zSetOperations = stringRedisTemplate.opsForZSet();
		this.valueOperations = redisTemplate.opsForValue();
		this.kafkaProducer = kafkaProducer;
	}

	public void grade(KafkaGradeRequest gradeRequest){
		System.out.println("ㅁㄴㅇㅁㄴㅇㄴㅁ");
		String roomId = gradeRequest.getRoomId();
		String playerName = gradeRequest.getPlayerName();
		Long count = hashOperations.size(roomId+"p");
		TemplateDetailResponse templateDetailResponse =  gson.fromJson(redisTemplate.opsForValue().get(roomId),
			TemplateDetailResponse.class);
		System.out.println(gradeRequest.getPlayerName());
		System.out.println(gradeRequest.getRoomId());
		System.out.println(gradeRequest.getQuizNum());
		String correctAnswer = templateDetailResponse.getQuizList().get(Integer.parseInt(gradeRequest.getQuizNum())-1).getAnswer();
		String answer = gradeRequest.getAnswer();
		System.out.println("확인2");
		if(correctAnswer.equals(answer)){
			System.out.println("확인3");
			//순위에 따른 점수 더해주기
			System.out.println(valueOperations.get(roomId+"cnt"));
			System.out.println("확인확인");
			Long scoreGet = 1000*(1-valueOperations.get(roomId+"cnt")/count);
			System.out.println("스코어 겟");
			Grade userGrade = hashOperations.get(roomId+"p", playerName);
			userGrade.setScoreGet(scoreGet.intValue());
			System.out.println("확인4");
			//얻은 점수 기록해두기
			hashOperations.put(roomId+"p", playerName, userGrade);
			System.out.println("확인5");
			//맞힌 사람 수 +1
			valueOperations.increment(roomId+"cnt",1);
			System.out.println("확인6");
			//현재 점수 반영
			zSetOperations.incrementScore(roomId+"rank",playerName,scoreGet);
		}
		System.out.println("끝");

		// Set<ZSetOperations.TypedTuple<String>> tp = zSetOperations.rangeWithScores(roomId+"rank",0,-1);
		// Set<String> ZSet = zSetOperations.range (roomId+"rank",0,-1);
		// Map<String, Grade> hashmap = hashOperations.entries(roomId+"p");

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

	// public void addGrades(KafkaGradeRequest gradeRequest){
	// 	String roomId = gradeRequest.getRoomId();
	// 	Grade grade = Grade.builder().
	// 		playerName(gradeRequest.getPlayerName())
	// 		.rankPre(0)
	// 		.rankNow(0)
	// 		.scoreGet(0)
	// 		.build(); ;
	// 	Double score = 0d;
	// 	//해쉬 현재 점수, 순위 정보
	// 	hashOperations.put(roomId+"p", gradeRequest.getPlayerName(), grade);
	// 	// 랭킹 정보
	// 	zSetOperations.add(roomId+"rank",gradeRequest.getPlayerName(),score);
	// }
	//
	// public Grade getGrade(String roomId, String name){
	// 	Grade grade = gson.fromJson(zSetOperations.popMax(roomId).getValue(), Grade.class);
	// 	System.out.println(grade);
	// 	return grade;
	// }

	public void rollback(String roomId) {
		Set<ZSetOperations.TypedTuple<String>> tp = zSetOperations.rangeWithScores(roomId+"rank",0,-1);
		Set<String> ZSet = zSetOperations.range (roomId+"rank",0,-1);

		Map<String, Grade> hashmap = hashOperations.entries(roomId+"p");
		hashmap.forEach((key, value)->{
			value.setRankNow(value.getRankPre());
			zSetOperations.incrementScore(roomId+"rank",value.getPlayerName(),-value.getScoreGet());
			value.setScoreGet(0);
			hashOperations.put(roomId,value.getPlayerName(),value);
		});
		kafkaProducer.rollbackFinish(roomId);
	}

	public void quizEnd(String roomId) {
		Map<String, Grade> hashmap = hashOperations.entries(roomId+"p");
		//점수 반영
		hashmap.forEach((key, value)->{
			zSetOperations.incrementScore(roomId+"rank",value.getPlayerName(),value.getScoreGet());
		});
		//채점끝
		kafkaProducer.gradeEnd(roomId);
	}

	public void quizStart(String roomId) {
		System.out.println("퀴즈 스타트");
		Map<String, Grade> hashmap = hashOperations.entries(roomId+"p");
		System.out.println("확인차1");
		// 현재 등수 이전 등수로 만들기, 이전 문제에서 얻은점수 썻으니 0으로 만들어주기
		hashmap.forEach((key, value)->{
			value.setRankPre(value.getRankNow());
			value.setScoreGet(0);
			System.out.println("확인차2");
			hashOperations.put(roomId,value.getPlayerName(),value);
		});
		System.out.println("확인차4");
		//정답 맞춘 사람수 0으로 초기화
		valueOperations.set(roomId+"cnt",0);
		System.out.println("확인차5");
		//채점 시작한다고 신호주기
		kafkaProducer.gradeStart(roomId);
		System.out.println("확인차6");
	}

}
