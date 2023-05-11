package com.luckquiz.grade.api.request;

import com.luckquiz.grade.api.common.exception.CustomException;
import com.luckquiz.grade.api.common.exception.CustomExceptionType;

import lombok.Getter;


public class KafkaGradeRequest {
	private Integer roomId;
	private String playerName;
	private Integer quizNum;
	private String answer;

	public Integer getRoomId() {
		if(roomId==null){
			throw new CustomException(CustomExceptionType.NULL_VALUE_ERROR);
		}
		return roomId;
	}

	public String getPlayerName() {
		if(playerName==null){
			throw new CustomException(CustomExceptionType.NULL_VALUE_ERROR);
		}
		return playerName;
	}

	public Integer getQuizNum() {
		if(quizNum==null){
			throw new CustomException(CustomExceptionType.NULL_VALUE_ERROR);
		}
		return quizNum;
	}

	public String getAnswer() {
		if(answer==null){
			throw new CustomException(CustomExceptionType.NULL_VALUE_ERROR);
		}
		return answer;
	}
}