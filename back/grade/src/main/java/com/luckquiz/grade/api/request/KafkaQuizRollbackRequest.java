package com.luckquiz.grade.api.request;

import com.luckquiz.grade.api.common.exception.CustomException;
import com.luckquiz.grade.api.common.exception.CustomExceptionType;

public class KafkaQuizRollbackRequest {
	private Integer roomId;

	public Integer getRoomId() {
		if(roomId==null){
			throw new CustomException(CustomExceptionType.NULL_VALUE_ERROR);
		}
		return roomId;
	}

}
