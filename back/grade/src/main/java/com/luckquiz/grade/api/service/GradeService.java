package com.luckquiz.grade.api.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.luckquiz.grade.api.common.enums.Game;
import com.luckquiz.grade.api.common.exception.CustomException;
import com.luckquiz.grade.api.common.exception.CustomExceptionType;
import com.luckquiz.grade.api.request.KafkaEmotionRequest;
import com.luckquiz.grade.api.request.KafkaEmotionResult;
import com.luckquiz.grade.api.request.KafkaFinalEndRequest;
import com.luckquiz.grade.api.request.KafkaGradeRequest;
import com.luckquiz.grade.api.request.KafkaQuizEndRequest;
import com.luckquiz.grade.api.request.KafkaQuizRollbackRequest;
import com.luckquiz.grade.api.request.KafkaQuizStartRequest;
import com.luckquiz.grade.api.response.KafkaGradeEndResponse;
import com.luckquiz.grade.api.response.KafkaGradeStartResponse;
import com.luckquiz.grade.api.response.KafkaRollbackFinishResponse;
import com.luckquiz.grade.api.response.TemplateDetailResponse;
import com.luckquiz.grade.api.response.TemplateInfoResponse;
import com.luckquiz.grade.config.KafkaProducer;
import com.luckquiz.grade.db.entity.Grade;
import com.luckquiz.grade.db.entity.RankKey;

import io.netty.util.internal.StringUtil;
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
		System.out.println("채점시작");
		zSetOperations.incrementScore(gradeRequest.getRoomId()+"statics",gradeRequest.getMessage(),1);
		Integer roomId = gradeRequest.getRoomId();
		String playerName = gradeRequest.getSender();
		// 총 참여자 수
		Long count = hashGradeOperations.size(roomId+"p");
		//null 값이면 에러.
		TemplateDetailResponse templateDetailResponse = gson.fromJson(redisTemplate.opsForValue().get(roomId.toString()),TemplateDetailResponse.class);
		TemplateInfoResponse quiz =  templateDetailResponse.getQuizList().get(gradeRequest.getQuizNum());
		String answer = gradeRequest.getMessage();
		// 퀴즈일 경우

		if(quiz.getGame().equals("")){
			String correctAnswer = quiz.getAnswer();
			Boolean correct = false;
			System.out.println(quiz.getQuiz());
			for(String ans: quiz.getAnswerList()){
				if(ans.equals(answer)){
					correct=true;
					break;
				}
			}
			if( (correctAnswer.equals(answer) ||correct) && gradeRequest.getQuizNum()==templateDetailResponse.getQuizNum()){
				//순위에 따른 점수 더해주기
				System.out.println(quiz.getGame());
				Integer rank = valueOperations.get(roomId+"cnt");
				Long scoreGet = (long)(1000*(1d-(rank.doubleValue()/count.doubleValue())));
				Grade userGrade = hashGradeOperations.get(roomId+"p", playerName);
				userGrade.setScoreGet(scoreGet.intValue());
				userGrade.setRankNow(rank+1);
				userGrade.setCount(userGrade.getCount()+1);
				//얻은 점수 기록해두기
				hashGradeOperations.put(roomId+"p", playerName, userGrade);
				//맞힌 사람 수 +1
				valueOperations.increment(roomId+"cnt",1);
				RankKey rankKey = new RankKey();
				rankKey.setImg(gradeRequest.getImg());
				rankKey.setSender(gradeRequest.getSender());
				//현재 점수 반영
				zSetOperations.incrementScore(roomId+"rank",gson.toJson(rankKey),scoreGet);
				System.out.println("받은 점수 : "+scoreGet + " 내 정답 : " + answer + " 진짜 정답 : " + correctAnswer+ " ");
				for(String ans:quiz.getAnswerList()){
					System.out.println(ans+ " ");
				}
			} else {
				RankKey rankKey = new RankKey();
				rankKey.setImg(gradeRequest.getImg());
				rankKey.setSender(gradeRequest.getSender());
				zSetOperations.incrementScore(roomId+"rank",gson.toJson(rankKey),0);
				System.out.println("받은 점수 : "+"0" + " 내 정답 : " + answer + " 진짜 정답 : " + correctAnswer + " ");
				for(String ans:quiz.getAnswerList()){
					System.out.println(ans+ " ");
				}
			}


		} else {
			//게임일 경우
			Grade userGrade;
			int scoreGet;
			Game game = Game.valueOf(quiz.getGame());
			System.out.println(game);
			switch (game){
				//많이 클릭
				case wakeup:
					Long numOfClick = Long.parseLong(answer);
					scoreGet = (int)(10L*numOfClick);
					userGrade = hashGradeOperations.get(roomId+"p", playerName);
					userGrade.setScoreGet(scoreGet);
					userGrade.setCount(userGrade.getCount()+1);
					hashGradeOperations.put(roomId+"p", playerName, userGrade);
					zSetOperations.incrementScore(roomId+"rank",playerName,scoreGet);
					System.out.println("받은점수 : "+scoreGet + "클릭 횟숫 : " + numOfClick);
					break;
				//숫자가 작은 순서대로.
				case balloon:
					Double timeDifference = Double.parseDouble(answer);
					scoreGet = (int)((1d/(0.65d+timeDifference))*650d);
					userGrade = hashGradeOperations.get(roomId+"p", playerName);
					userGrade.setScoreGet(scoreGet);
					userGrade.setCount(userGrade.getCount()+1);
					hashGradeOperations.put(roomId+"p", playerName, userGrade);
					zSetOperations.incrementScore(roomId+"rank",playerName,scoreGet);
					System.out.println("받은 점수 :"+scoreGet + " 시간차: " + timeDifference);
					break;
				default:
					System.out.println("디폴트");
					break;
			};

		}
		// System.out.println(correctAnswer);
		// System.out.println(gradeRequest.getMessage());
		// System.out.println(gradeRequest.getSender());
		// System.out.println(gradeRequest.getRoomId());

	//정답이 맞으면, 퀴즈 번호가 같다면.


		// Set<ZSetOperations.TypedTuple<String>> tp = zSetOperations.rangeWithScores(roomId+"rank",0,-1);
		// Set<String> ZSet = zSetOperations.range (roomId+"rank",0,-1);
		// Map<String, Grade> hashmap = hashOperations.entries(roomId+"p");
	}

	public void pictureGrade(KafkaEmotionRequest gradeRequest){
		System.out.println("사진채점시작");
		Integer roomId = gradeRequest.getRoomId();
		String playerName = gradeRequest.getSender();
		// 총 참여자 수
		Long count = hashGradeOperations.size(roomId+"p");
		TemplateDetailResponse templateDetailResponse =  gson.fromJson(redisTemplate.opsForValue().get(roomId.toString()),
			TemplateDetailResponse.class);
		if(templateDetailResponse == null){
			log.warn("템플릿이 비어있네요");
			return;
		}
		System.out.println("123123123");
		String correctAnswer = templateDetailResponse.getQuizList().get(gradeRequest.getQuizNum()).getAnswer();
		KafkaEmotionResult.ValCon answer = gradeRequest.getEmotionResult();
		//정답이 맞으면, 퀴즈 번호가 같다면.
		if(gradeRequest.getQuizNum()!=templateDetailResponse.getQuizNum()){
			throw new CustomException(CustomExceptionType.QUIZ_NUM_ERROR);
		}
		// 받은 결과값의 감정이 정답과 같다면.
		if(correctAnswer.equals(answer.getValue())){

			Long scoreGet = (long)(1000*answer.getConfidence());
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



	//카프카에서 enter 메시지가 왔을때 실행하는 함수
	// public void enter(String message){
	// 	KafkaGradeRequest gradeRequest = gson.fromJson(message,KafkaGradeRequest.class);
	// 	Integer roomId = gradeRequest.getRoomId();
	// 	Grade grade = Grade.builder().
	// 		playerName(gradeRequest.getSender())
	// 		.rankPre(0)
	// 		.rankNow(0)
	// 		.scoreGet(0)
	// 		.build();
	// 	Double score = 0d;
	// 	//해쉬 현재 점수, 순위 정보
	// 	hashGradeOperations.put(roomId+"p", gradeRequest.getSender(), grade);
	// 	// 랭킹 정보
	// 	zSetOperations.add(roomId+"rank",gradeRequest.getSender(),score);
	// }


	// 카프카에서 rollback 메시지가 왔을때 실행하는 함수
	public void rollback(Object message) {
		System.out.println("롤백 시작");
		KafkaQuizRollbackRequest quizRollbackRequest = (KafkaQuizRollbackRequest) message;
		Integer roomId = quizRollbackRequest.getRoomId();

		// Set<ZSetOperations.TypedTuple<String>> tp = zSetOperations.rangeWithScores(roomId+"rank",0,-1);
		// Set<String> ZSet = zSetOperations.range (roomId+"rank",0,-1);
		Map<String, Grade> hashmap = hashGradeOperations.entries(roomId+"p");
		//랭킹점수 받았던거 다시 줄이기.
		hashmap.forEach((key, value)->{
			value.setRankNow(value.getRankPre());
			zSetOperations.incrementScore(roomId+"rank",value.getPlayerName(),-value.getScoreGet());
			value.setScoreGet(0);
			hashGradeOperations.put(roomId+"p",value.getPlayerName(),value);
		});

		// KafkaRollbackFinishResponse kafkaRollbackFinishResponse = (KafkaRollbackFinishResponse) message;
		kafkaProducer.rollbackFinish(gson.toJson(quizRollbackRequest));
	}

	//카프카에서 quiz_end 메시지가 올때 실행하는 함수
	public void quizEnd(Object message) {
		KafkaQuizEndRequest quizStartMessage = (KafkaQuizEndRequest) message;
		Integer roomId = quizStartMessage.getRoomId();
		Map<String, Grade> hashmap = hashGradeOperations.entries(roomId+"p");
		Stream<Map.Entry<String,Grade>> entries = hashmap.entrySet().stream();
		entries.sorted(Comparator.comparing(e->e.getValue().getScoreGet())).forEachOrdered(e->hashmap.put(e.getKey(),e.getValue()));
		//랭킹점수 받았던거 다시 줄이기.
		int i = 1;
		for(Map.Entry<String,Grade> entry: hashmap.entrySet()){
			entry.getValue().setRankNow(i++);
			hashGradeOperations.put(roomId+"p",entry.getValue().getPlayerName(),entry.getValue());
		}
		// Map<String, Grade> hashmap = hashGradeOperations.entries(roomId+"p");
		//점수 반영
		// hashmap.forEach((key, value)->{
		// 	zSetOperations.incrementScore(roomId+"rank",value.getPlayerName(),value.getScoreGet());
		// });
		//초기화
		// valueOperations.set(roomId+"cnt",0);
		//채점끝
		TemplateDetailResponse templateDetailResponse =  gson.fromJson(redisTemplate.opsForValue().get(roomId.toString()),
			TemplateDetailResponse.class);
		Integer quizNum = templateDetailResponse.getQuizNum();
		Long count = hashGradeOperations.size(roomId+"p");
		Integer solvedCount = valueOperations.get(roomId+"cnt");
		//정답률
		Double percent = solvedCount.doubleValue()/count;
		KafkaGradeEndResponse gradeFinish = KafkaGradeEndResponse.builder().roomId(roomId).quizNum(quizNum).solvedCount(solvedCount).count(count.intValue())
			.build();
		kafkaProducer.gradeEnd(gson.toJson(gradeFinish));
	}
	//카프카에서 quiz_start 메시지가 올때 실행하는 함수
	public void quizStart(Object message) {
		KafkaQuizStartRequest quizStartMessage = (KafkaQuizStartRequest) message;
		Integer roomId = quizStartMessage.getRoomId();
		TemplateDetailResponse templateDetailResponse = gson.fromJson(redisTemplate.opsForValue().get(roomId.toString()), TemplateDetailResponse.class);
		System.out.println("zset 삭제");
		System.out.println(roomId);
		zSetOperations.removeRange(roomId+"statics",0,-1);
		// zSetOperations.remove(roomId+"statics");
		// 지웠음
		// templateDetailResponse.setQuizNum(quizStartMessage.getQuizNum());
		// redisTemplate.opsForValue().set(roomId.toString(), gson.toJson(templateDetailResponse));
		Map<String, Grade> hashmap = hashGradeOperations.entries(roomId+"p");
		// 현재 등수 이전 등수로 만들기, 이전 문제에서 얻은점수 썻으니 0으로 만들어주기
		hashmap.forEach((key, value)->{
			value.setRankPre(value.getRankNow());
			value.setScoreGet(0);
			System.out.println(key);
			System.out.println("받은 점수 : " + value.getScoreGet());
			System.out.println("현재 순위 : " + value.getRankNow());
			hashGradeOperations.put(roomId+"p",value.getPlayerName(),value);
		});
		//정답 맞춘 사람수 0으로 초기화
		valueOperations.set(roomId+"cnt",0);
		//채점 시작한다고 신호주기
		KafkaGradeStartResponse gradeStartResponse = new KafkaGradeStartResponse();
		gradeStartResponse.setRoomId(roomId);
		kafkaProducer.gradeStart(gson.toJson(gradeStartResponse));
	}
	public void finalFinish(KafkaFinalEndRequest kafkaFinalEndRequest){
		valueOperations.getAndDelete(kafkaFinalEndRequest.getRoomId()+"cnt");
		redisTemplate.delete(kafkaFinalEndRequest.getRoomId()+"statics");
		System.out.println(kafkaFinalEndRequest.getRoomId()+"방이 끝났습니다.");
	}

}
