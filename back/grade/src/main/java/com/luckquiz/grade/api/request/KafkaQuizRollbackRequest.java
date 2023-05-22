package com.luckquiz.grade.api.request;

import java.util.UUID;

import com.luckquiz.grade.api.common.exception.CustomException;
import com.luckquiz.grade.api.common.exception.CustomExceptionType;

public class KafkaQuizRollbackRequest {
	private Integer roomId;
	private UUID hostId;
	public Integer getRoomId() {
		if(roomId==null){
			throw new CustomException(CustomExceptionType.NULL_VALUE_ERROR);
		}
		return roomId;
	}

	public void setHostId(UUID hostId) {
		this.hostId = hostId;
	}

	public void setHostId(String hostId) {
		this.hostId = UUID.fromString(hostId);
	}

	public UUID getHostId() {
		return hostId;
	}
}
