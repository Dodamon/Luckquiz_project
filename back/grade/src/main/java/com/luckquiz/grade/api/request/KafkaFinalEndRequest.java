package com.luckquiz.grade.api.request;

import java.util.UUID;

import lombok.Getter;

@Getter
public class KafkaFinalEndRequest {
	private Integer roomId;
	private UUID hostId;
}
