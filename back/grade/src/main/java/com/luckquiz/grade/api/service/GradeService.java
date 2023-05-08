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
import com.luckquiz.grade.config.KafkaProducer;
import com.luckquiz.grade.db.entity.Grade;
import com.luckquiz.grade.db.entity.GradeFinish;
import com.luckquiz.grade.db.entity.QuizStart;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class GradeService {
	private final StringRedisTemplate redisTemplate;
	private final Gson gson;
	private final KafkaProducer kafkaProducer;
	private final HashOperations<String, String, Grade> hashOperations;
	private final ZSetOperations<String, String> zSetOperations;
	private final ValueOperations<String,Integer> valueOperations;

	private final HashOperations<String,String,Grade> hashGradeOperations;



	public GradeService(StringRedisTemplate stringRedisTemplate, Gson gson, KafkaProducer kafkaProducer, RedisTemplate<String, Integer> redisTemplate, RedisTemplate<String, Grade> redisGradeTemplate){
		this.redisTemplate = stringRedisTemplate;
		this.gson = gson;
		this.hashOperations = stringRedisTemplate.opsForHash();
		this.zSetOperations = stringRedisTemplate.opsForZSet();
		this.valueOperations = redisTemplate.opsForValue();
		this.kafkaProducer = kafkaProducer;
		this.hashGradeOperations = redisGradeTemplate.opsForHash();
	}

	public void grade(KafkaGradeRequest gradeRequest){
		String roomId = gradeRequest.getRoomId();
		String playerName = gradeRequest.getPlayerName();
		Long count = hashGradeOperations.size(roomId+"p");
		TemplateDetailResponse templateDetailResponse =  gson.fromJson(redisTemplate.opsForValue().get(roomId),
			TemplateDetailResponse.class);
		String correctAnswer = templateDetailResponse.getQuizList().get(Integer.parseInt(gradeRequest.getQuizNum())-1).getAnswer();
		String answer = gradeRequest.getAnswer();
		if(correctAnswer.equals(answer)){
			//순위에 따른 점수 더해주기
			Long scoreGet = (long)(1000*(1-valueOperations.get(roomId+"cnt").doubleValue()/count));
			Grade userGrade = hashGradeOperations.get(roomId+"p", playerName);
			userGrade.setScoreGet(scoreGet.intValue());
			//얻은 점수 기록해두기
			hashGradeOperations.put(roomId+"p", playerName, userGrade);
			//맞힌 사람 수 +1
			valueOperations.increment(roomId+"cnt",1);
			//현재 점수 반영
			zSetOperations.incrementScore(roomId+"rank",playerName,scoreGet);
		}
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

	//카프카에서 enter 메시지가 왔을때 실행하는 함수
	public void enter(KafkaGradeRequest gradeRequest){
		String roomId = gradeRequest.getRoomId();
		Grade grade = Grade.builder().
			playerName(gradeRequest.getPlayerName())
			.rankPre(0)
			.rankNow(0)
			.scoreGet(0)
			.build(); ;
		Double score = 0d;
		//해쉬 현재 점수, 순위 정보
		hashGradeOperations.put(roomId+"p", gradeRequest.getPlayerName(), grade);
		// 랭킹 정보
		zSetOperations.add(roomId+"rank",gradeRequest.getPlayerName(),score);
	}
	//
	// public Grade getGrade(String roomId, String name){
	// 	Grade grade = gson.fromJson(zSetOperations.popMax(roomId).getValue(), Grade.class);
	// 	System.out.println(grade);
	// 	return grade;
	// }

	// 카프카에서 rollback 메시지가 왔을때 실행하는 함수
	public void rollback(Object message) {
		QuizStart quizStartMessage = (QuizStart) message;
		String roomId = quizStartMessage.getRoomId().toString();

		Set<ZSetOperations.TypedTuple<String>> tp = zSetOperations.rangeWithScores(roomId+"rank",0,-1);
		Set<String> ZSet = zSetOperations.range (roomId+"rank",0,-1);
		Map<String, Grade> hashmap = hashGradeOperations.entries(roomId+"p");

		hashmap.forEach((key, value)->{
			value.setRankNow(value.getRankPre());
			zSetOperations.incrementScore(roomId+"rank",value.getPlayerName(),-value.getScoreGet());
			value.setScoreGet(0);
			hashGradeOperations.put(roomId+"p",value.getPlayerName(),value);
		});
		kafkaProducer.rollbackFinish(quizStartMessage);
	}

	//카프카에서 quiz_end 메시지가 올때 실행하는 함수
	public void quizEnd(Object message) {
		QuizStart quizStartMessage = (QuizStart) message;
		Integer roomId = quizStartMessage.getRoomId();
		// Map<String, Grade> hashmap = hashGradeOperations.entries(roomId+"p");
		//점수 반영
		// hashmap.forEach((key, value)->{
		// 	zSetOperations.incrementScore(roomId+"rank",value.getPlayerName(),value.getScoreGet());
		// });
		//초기화
		// valueOperations.set(roomId+"cnt",0);
		//채점끝
		TemplateDetailResponse templateDetailResponse =  gson.fromJson(redisTemplate.opsForValue().get(roomId),
			TemplateDetailResponse.class);
		Integer quizNum = templateDetailResponse.getQuizNum();
		Long count = hashGradeOperations.size(roomId+"p");
		Integer solvedCount = valueOperations.get(roomId+"cnt");
		//정답률
		Double percent = solvedCount.doubleValue()/count;
		GradeFinish gradeFinish = GradeFinish.builder().roomId(roomId).quizNum(quizNum).solvedCount(solvedCount).count(count.intValue())
			.build();
		kafkaProducer.gradeEnd(gradeFinish);
	}
	//카프카에서 quiz_start 메시지가 올때 실행하는 함수
	public void quizStart(Object message) {
		QuizStart quizStartMessage = (QuizStart) message;
		String roomId = quizStartMessage.getRoomId().toString();
		Map<String, Grade> hashmap = hashGradeOperations.entries(roomId+"p");
		// 현재 등수 이전 등수로 만들기, 이전 문제에서 얻은점수 썻으니 0으로 만들어주기
		hashmap.forEach((key, value)->{
			value.setRankPre(value.getRankNow());
			value.setScoreGet(0);
			hashGradeOperations.put(roomId+"p",value.getPlayerName(),value);
		});
		//정답 맞춘 사람수 0으로 초기화
		valueOperations.set(roomId+"cnt",0);
		//채점 시작한다고 신호주기
		kafkaProducer.gradeStart(quizStartMessage);
	}

}
