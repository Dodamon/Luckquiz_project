package com.luckquiz.grade.api.service;

import java.util.Arrays;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;
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
import com.luckquiz.grade.api.response.TemplateDetailResponse;
import com.luckquiz.grade.api.response.TemplateInfoResponse;
import com.luckquiz.grade.config.KafkaProducer;
import com.luckquiz.grade.db.entity.Grade;
import com.luckquiz.grade.db.entity.RankKey;


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

		System.out.println("유저의 이름, img 확인 : " + gradeRequest.getSender() + "  " + gradeRequest.getImg());
		// zSetOperations.removeRange("temp",0,-1);
		Integer roomId = gradeRequest.getRoomId();
		//null 값이면 에러.
		TemplateDetailResponse templateDetailResponse = gson.fromJson(redisTemplate.opsForValue().get(roomId.toString()),TemplateDetailResponse.class);
		TemplateInfoResponse quiz =  templateDetailResponse.getQuizList().get(gradeRequest.getQuizNum());
		// 문제 번호가 다르면 그냥 넘어가기.
		if(gradeRequest.getQuizNum()!=templateDetailResponse.getQuizNum()) {
			log.info("퀴즈 번호가 달라서 무효처리 합니다.");
			return;
		}
		// redisTemplate.expire(gradeRequest.getRoomId()+"statics",30, TimeUnit.SECONDS);
		zSetOperations.incrementScore(gradeRequest.getRoomId()+"statics",gradeRequest.getMessage(),1);

		String playerName = gradeRequest.getSender();
		// 총 참여자 수
		Long count = hashGradeOperations.size(roomId+"p");

		String answer = gradeRequest.getMessage();
		// 퀴즈일 경우
		if(quiz.getGame().equals("")){
			//단일 정답.
			String correctAnswer = quiz.getAnswer();
			Boolean correct = false;
			Boolean several = false;
			System.out.println(quiz.getAnswerList());
			if(quiz.getAnswerList().size() == 0){

				System.out.println("중복 정답 없는 문제입니다.");
			} else {
				several = true;
				for(String ans: quiz.getAnswerList()){
					System.out.println(ans);
					if(ans.equals(answer)){
						System.out.println("중복 정답입니다.");
						correct=true;
						break;
					}
				}
			}

			// 여러개 정답.

			if( ((!several) && correctAnswer.equals(answer)) || (correct) ){
				//순위에 따른 점수 더해주기
				System.out.println("정답입니다. " + playerName);
				Integer rank = valueOperations.get(roomId+"cnt");
				Long scoreGet = Math.round(1000*(1d-(rank.doubleValue()/count.doubleValue())));
				Grade userGrade = hashGradeOperations.get(roomId+"p", playerName);
				userGrade.setScoreGet(scoreGet.intValue());
				// userGrade.setRankNow(rank+1);
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
				log.info("받은 점수 : "+scoreGet + " 내 정답 : " + answer + " 진짜 정답 : " + correctAnswer+ " ");
				for(String ans:quiz.getAnswerList()){
					log.info(ans+ " ");
				}
			} else {
				RankKey rankKey = new RankKey();
				rankKey.setImg(gradeRequest.getImg());
				rankKey.setSender(gradeRequest.getSender());
				zSetOperations.incrementScore(roomId+"rank",gson.toJson(rankKey),0);
				log.info("받은 점수 : "+"0" + " 내 정답 : " + answer + " 진짜 정답 : " + correctAnswer + " ");
				for(String ans:quiz.getAnswerList()){
					log.info(ans+ " ");
				}
			}
		} else {
			//게임일 경우
			Grade userGrade;
			int scoreGet;
			Game game = Game.valueOf(quiz.getGame());
			RankKey rankKey = new RankKey();
			rankKey.setSender(gradeRequest.getSender());
			rankKey.setImg(gradeRequest.getImg());
			System.out.println(game);

			switch (game){
				//많이 클릭
				case wakeup:
					Long numOfClick = Long.parseLong(answer);
					scoreGet = (int)(10L*numOfClick);
					userGrade = hashGradeOperations.get(roomId+"p", playerName);
					userGrade.setScoreGet(scoreGet);
					// userGrade.setCount(userGrade.getCount()+1);
					hashGradeOperations.put(roomId+"p", playerName, userGrade);
					zSetOperations.incrementScore(roomId+"rank",gson.toJson(rankKey),scoreGet);
					log.info("받은점수 : "+scoreGet + "클릭 횟수 : " + numOfClick);
					break;
				//숫자가 작은 순서대로.
				case balloon:
					Double timeDifference = Double.parseDouble(answer);
					scoreGet = (int) Math.round((1d/(0.65d+timeDifference))*650d);
					userGrade = hashGradeOperations.get(roomId+"p", playerName);
					userGrade.setScoreGet(scoreGet);
					// userGrade.setCount(userGrade.getCount()+1);
					hashGradeOperations.put(roomId+"p", playerName, userGrade);
					zSetOperations.incrementScore(roomId+"rank",gson.toJson(rankKey),scoreGet);
					log.info("받은 점수 :"+scoreGet + " 시간차: " + timeDifference);
					break;
				default:
					log.warn("없는 키값이 카프카 grade 토픽에 들어왔습니다. 확인해주세요.");
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
		System.out.println("사진 채점 유저의 이름, img 확인 : " + gradeRequest.getSender() + "  " + gradeRequest.getImg());

		System.out.println();
		// 방 번호
		Integer roomId = gradeRequest.getRoomId();
		// 사용자 이름
		String playerName = gradeRequest.getSender();
		// 퀴즈 번호
		Integer quizNum = gradeRequest.getQuizNum();
		// 템플릿 정보
		TemplateDetailResponse templateDetailResponse =  gson.fromJson(redisTemplate.opsForValue().get(roomId.toString()),
			TemplateDetailResponse.class);
		if(gradeRequest.getQuizNum() != templateDetailResponse.getQuizNum()){
			log.info("퀴즈 번호가 달라서 무효처리 합니다.");
			return;
		}

		if(templateDetailResponse == null){
			log.warn("템플릿이 비어있네요");
			return;
		}
		// 정답 (감정 종류)
		String correctAnswer = templateDetailResponse.getQuizList().get(quizNum).getAnswer();
		// 사용자 감정 사진에서 받은 데이터
		KafkaEmotionResult.ValCon answer = gradeRequest.getEmotionResult();
		//퀴즈 번호가 같다면 현재 진행중인 퀴즈번호가 아니면
		if(quizNum!=templateDetailResponse.getQuizNum()){
			throw new CustomException(CustomExceptionType.QUIZ_NUM_ERROR);
		}
		// 랭킹 키를 json string으로 만들어서 조회하기 위해 객체 생성
		RankKey rankKey = new RankKey();
		rankKey.setSender(gradeRequest.getSender());
		rankKey.setImg(gradeRequest.getImg());
		// 받은 감정 종류의 개수에 +1 (통계용)
		zSetOperations.incrementScore(roomId+"statics",answer.getValue(),1);
		// 감정 종류가 제출한 사진 데이터의 감정과 같다면.
		if (answer.getValue()=="laugh"){
			answer.setValue("smile");
		}
		if(correctAnswer.equals(answer.getValue())){
			Long scoreGet = Math.round(1000*answer.getConfidence());
			Grade userGrade = hashGradeOperations.get(roomId+"p", playerName);
			userGrade.setScoreGet(scoreGet.intValue());
			//얻은 점수 기록해두기
			hashGradeOperations.put(roomId+"p", playerName, userGrade);
			//맞힌 사람 수 +1
			valueOperations.increment(roomId+"cnt",1);
			//현재 점수 반영
			zSetOperations.incrementScore(roomId+"rank",gson.toJson(rankKey),scoreGet);
		} else {
			// 감정 종류가 다를 경우.
			Grade userGrade = hashGradeOperations.get(roomId+"p", playerName);
			zSetOperations.incrementScore(roomId+"rank",gson.toJson(rankKey),0);
		}
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
	public void rollback(KafkaQuizRollbackRequest message) {

		log.info("rollback 시작");
		Integer roomId = message.getRoomId();
		TemplateDetailResponse templateDetailResponse =  gson.fromJson(redisTemplate.opsForValue().get(roomId.toString()),
			TemplateDetailResponse.class);
		message.setHostId(templateDetailResponse.getHostId());
		// Set<ZSetOperations.TypedTuple<String>> tp = zSetOperations.rangeWithScores(roomId+"rank",0,-1);
		// Set<String> ZSet = zSetOperations.range (roomId+"rank",0,-1);
		Map<String, Grade> hashmap = hashGradeOperations.entries(roomId+"p");
		//랭킹점수 받았던거 다시 줄이기.
		hashmap.forEach((key, value)->{
			System.out.println("유저의 이름, img 확인 : " + key + "  " + value.getPlayerImg());
			RankKey rankKey = new RankKey();
			rankKey.setImg(value.getPlayerImg());
			rankKey.setSender(value.getPlayerName());
			value.setRankNow(value.getRankPre());
			zSetOperations.incrementScore(roomId+"rank",gson.toJson(rankKey),-value.getScoreGet());
			value.setTotalScore(value.getTotalScore()-value.getScoreGet());
			value.setTotalRankNow(value.getTotalRankPre());
			value.setScoreGet(0);
			hashGradeOperations.put(roomId+"p",value.getPlayerName(),value);
		});

		// KafkaRollbackFinishResponse kafkaRollbackFinishResponse = (KafkaRollbackFinishResponse) message;

		kafkaProducer.rollbackFinish(gson.toJson(message));
	}

	//카프카에서 quiz_end 메시지가 올때 실행하는 함수
	public void quizEnd(KafkaQuizEndRequest message) {
		// 방 번호
		Integer roomId = message.getRoomId();
		// 템플릿 정보
		TemplateDetailResponse templateDetailResponse = gson.fromJson(redisTemplate.opsForValue().get(roomId.toString()),
			TemplateDetailResponse.class);;
		// 현재 퀴즈번호
		Integer quizNum = templateDetailResponse.getQuizNum();;
		// 전체 커넥션 수.
		Long connectionCount = hashGradeOperations.size(roomId+"p");
		// 퀴즈 맞힌사람 수.
		Integer correctCount = valueOperations.get(roomId+"cnt");
		// 퀴즈 푼사람 수
		Integer solveCount = 0;
		// 플레이어 정보 "아놔" :{"playerName":"아놔","playerImg":14,"scoreGet":0,"rankPre":0,"rankNow":0,"count":0,"quizNum":0}
		Map<String, Grade> playersInfo = hashGradeOperations.entries(roomId+"p");
		// answerStatics 통계 (정답별 선택한 수)
		Set<ZSetOperations.TypedTuple<String>> answerStatics = zSetOperations.reverseRangeWithScores(roomId+"statics",0,-1);

		// answerStatics를 map으로 변경(json으로 만들기 위하여)
		LinkedHashMap<String, Integer> answerData = new LinkedHashMap<>();
		// 순서가 보장된 linked맵 사용하며, 퀴즈 푼사람수(solveCount) 구하기

		for (ZSetOperations.TypedTuple<String> answerStatic : answerStatics) {
			System.out.println(" 선택 정답 :" + answerStatic.getValue() + " 정답 선택 수 : "+ answerStatic.getScore().intValue());
			answerData.put(answerStatic.getValue(), answerStatic.getScore().intValue());
			solveCount += answerStatic.getScore().intValue();
		}


		// 처음에는 아래의 방법으로 만들었지만, 총 몇명이 참여했는지 까지 1번의 for문으로 구하는 것이 좋기 때문에 변경.
		// LinkedHashMap<String, Double> answerData = answerStatics.stream().collect(Collectors.toMap(data->data.getValue(),data->data.getScore(),(data1,data2)->data1,LinkedHashMap::new));
		LinkedHashMap<String, Grade> sortedPlayerInfo = playersInfo.entrySet().stream().sorted(Map.Entry.comparingByValue(Comparator.comparing((data)->-data.getScoreGet()))).collect(LinkedHashMap::new,(map, entry) -> map.put(entry.getKey(), entry.getValue()), LinkedHashMap::putAll);
		// sortedPlayerInfo.entrySet().stream().sorted(Map.Entry.comparingByValue(Comparator.comparing((data)->-data.getScoreGet()))).collect(LinkedHashMap::new,(map, entry) -> map.put(entry.getKey(), entry.getValue()), LinkedHashMap::putAll);

		// 플레이어 정보 scoreGet(이번 게임에서 얻은 점수) 순으로 정렬
		// Stream<Map.Entry<String,Grade>> entries = playersInfo.entrySet().stream();
		playersInfo.entrySet().stream().sorted(Comparator.comparing(e->e.getValue().getScoreGet())).forEachOrdered(e->playersInfo.put(e.getKey(),e.getValue()));

		// 순위(rankNow) 매기기
		int scoreGet = -10000;
		int ranking = 0;

		for(Map.Entry<String,Grade> playerInfo: sortedPlayerInfo.entrySet()){
			// 이전 사람 점수와 같으면 같은 등수.
			if(scoreGet == playerInfo.getValue().getScoreGet()){
				playerInfo.getValue().setRankNow(ranking);
			} else {
				playerInfo.getValue().setRankNow(++ranking);
			}
			scoreGet = playerInfo.getValue().getScoreGet();
			// 플레이어 정보에서 ranking 갱신된 것 저장.0
			System.out.println("갱신 후 플레이어 이름: " + playerInfo.getKey() + " 점수 : " + playerInfo.getValue().getScoreGet() + " 바뀐 후 순위 : " + playerInfo.getValue().getRankNow());
			hashGradeOperations.put(roomId+"p",playerInfo.getValue().getPlayerName(),playerInfo.getValue());
		}

		// 전체 랭킹 데이터
		Set<ZSetOperations.TypedTuple<String>> rankingData = zSetOperations.reverseRangeWithScores(roomId+"rank",0,-1);
		// Json으로 만들려고 linkedhashmap으로 변환. {사람1:1500, 사람2:1300, 사람3:1000, 사람4:500}
		LinkedHashMap<String, Integer> rankingDataMap = rankingData.stream().collect(Collectors.toMap(data->gson.fromJson(data.getValue(), RankKey.class).getSender() , data->data.getScore().intValue(),(a, b)->a,LinkedHashMap::new));
		scoreGet = -10000;
		ranking = 0;
		for(Map.Entry<String,Integer> data :rankingDataMap.entrySet()){
			Grade grade = sortedPlayerInfo.get(data.getKey());
			RankKey rankKey = new RankKey();
			rankKey.setSender(grade.getPlayerName());
			rankKey.setImg(grade.getPlayerImg());
			grade.setTotalScore(data.getValue());
			if(scoreGet == data.getValue()){
				grade.setTotalRankNow(ranking);
				hashGradeOperations.put(roomId+"p", gson.toJson(rankKey), grade);
			} else {
				grade.setTotalRankNow(++ranking);
				hashGradeOperations.put(roomId+"p", gson.toJson(rankKey), grade);
			}
			scoreGet = data.getValue();
		}
		//정답률
		Double correctRate = solveCount!=0?(correctCount.doubleValue()/solveCount.doubleValue())*100 :0;

		// 보낸 메시지 작성
		KafkaGradeEndResponse gradeFinish = KafkaGradeEndResponse.builder()
			.roomId(roomId)
			.quizNum(quizNum)
			.solveCount(solveCount)
			.connectionCount(connectionCount.intValue())
			.correctCount(correctCount)
			.correctRate(correctRate)
			.answerData(answerData)
			.rankingData(rankingDataMap)
			.build();
		kafkaProducer.gradeEnd(gson.toJson(gradeFinish));
	}
	//카프카에서 quiz_start 메시지가 올때 실행하는 함수
	public void quizStart(KafkaQuizStartRequest message) {
		Integer roomId = message.getRoomId();
		TemplateDetailResponse templateDetailResponse = gson.fromJson(redisTemplate.opsForValue().get(roomId.toString()), TemplateDetailResponse.class);
		log.info("quiz Start 시작, zset 삭제, 방번호 : "+roomId);
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
			value.setRankNow(0);
			value.setTotalRankPre(value.getTotalRankNow());
			log.info("키값 : "+ key+" 받은 점수 : " + value.getScoreGet() + " 현재 순위 : " +value.getRankNow());
			hashGradeOperations.put(roomId+"p",value.getPlayerName(),value);
		});
		//정답 맞춘 사람수 0으로 초기화
		valueOperations.set(roomId+"cnt",0);
		//채점 시작한다고 신호주기
		KafkaGradeStartResponse gradeStartResponse = new KafkaGradeStartResponse();
		gradeStartResponse.setRoomId(roomId);
		gradeStartResponse.setHostId(message.getHostId());
		kafkaProducer.gradeStart(gson.toJson(gradeStartResponse));
	}

	public void finalFinish(KafkaFinalEndRequest kafkaFinalEndRequest){
		// 정리하기
		// redisTemplate.delete(kafkaFinalEndRequest.getRoomId()+"statics");
		// redisTemplate.delete(kafkaFinalEndRequest.getRoomId()+"rank");
		// redisTemplate.delete(kafkaFinalEndRequest.getRoomId()+"p");
		// redisTemplate.delete(kafkaFinalEndRequest.getRoomId()+"cnt");
		// redisTemplate.delete(kafkaFinalEndRequest.getRoomId()+"l");
		// redisTemplate.delete(kafkaFinalEndRequest.getRoomId().toString());
		log.info(kafkaFinalEndRequest.getRoomId()+"방이 끝났습니다.");
	}

	public void deleteAll(KafkaFinalEndRequest kafkaFinalEndRequest){
		redisTemplate.delete(kafkaFinalEndRequest.getRoomId()+"statics");
		redisTemplate.delete(kafkaFinalEndRequest.getRoomId()+"rank");
		redisTemplate.delete(kafkaFinalEndRequest.getRoomId()+"p");
		redisTemplate.delete(kafkaFinalEndRequest.getRoomId()+"cnt");
		redisTemplate.delete(kafkaFinalEndRequest.getRoomId()+"l");
		redisTemplate.delete(kafkaFinalEndRequest.getRoomId().toString());
	}

}
