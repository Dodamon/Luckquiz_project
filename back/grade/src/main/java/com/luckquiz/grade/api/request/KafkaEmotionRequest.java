package com.luckquiz.grade.api.request;

import com.luckquiz.grade.api.common.exception.CustomException;
import com.luckquiz.grade.api.common.exception.CustomExceptionType;

import lombok.Getter;

@Getter
public class KafkaEmotionRequest {
	private String type;
	private KafkaEmotionResult result;
	private Integer roomId;
	private String name;
	private int quizNum;

	public void setQuizNum(int quizNum){
		this.quizNum = quizNum;
	}
	public void setType(String type){
		this.type = type;
	}

	public void setResult(KafkaEmotionResult emotionResult){
		if(emotionResult == null){
			throw new CustomException(CustomExceptionType.FACE_NOT_FOUND);
		}
		this.result = emotionResult;
	}

	public void setRoomId(Integer roomId){
		this.roomId = roomId;
	}

	public void setName(String name){
		this.name = name;
	}
}
