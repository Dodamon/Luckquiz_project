package com.luckquiz.grade.api.request;

import com.luckquiz.grade.api.common.exception.CustomException;
import com.luckquiz.grade.api.common.exception.CustomExceptionType;

import lombok.Getter;


public class KafkaGradeRequest {
	private String hostId;
	private int roomId;
	private String sender;
	private int img;
	private int quizNum;
	private String message;
	private String file;


	public String getHostId() {
		return hostId;
	}

	public int getRoomId() {
		return roomId;
	}

	public String getSender() {
		if(sender == null){
			throw new CustomException(CustomExceptionType.NULL_VALUE_ERROR);
		}
		return sender;
	}

	public int getImg() {
		return img;
	}

	public int getQuizNum() {
		return quizNum;
	}

	public String getMessage() {
		if(message == null){
			throw new CustomException(CustomExceptionType.NULL_VALUE_ERROR);
		}
		return message;
	}

	public String getFile() {
		if(file == null){
			throw new CustomException(CustomExceptionType.NULL_VALUE_ERROR);
		}
		return file;
	}
}