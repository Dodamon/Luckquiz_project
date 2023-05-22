package com.luckquiz.grade.api.request;

import com.luckquiz.grade.api.common.exception.CustomException;
import com.luckquiz.grade.api.common.exception.CustomExceptionType;

import lombok.Getter;

@Getter
public class KafkaEmotionRequest {
	private Integer roomId;
	private String sender;
	private Integer quizNum;
	private KafkaEmotionResult.ValCon emotionResult;
	private Integer img;

	public void setQuizNum(int quizNum){
		this.quizNum = quizNum;
	}


	public void setEmotionResult(KafkaEmotionResult.ValCon emotionResult){
		if(emotionResult == null){
			throw new CustomException(CustomExceptionType.FACE_NOT_FOUND);
		}
		this.emotionResult = emotionResult;
	}

	public void setRoomId(Integer roomId){
		this.roomId = roomId;
	}

	public void setSender(String name){
		this.sender = name;
	}

	public void setQuizNum(Integer quizNum) {
		this.quizNum = quizNum;
	}
}
