package com.luckquiz.grade.api.response;

import java.util.UUID;

import lombok.Setter;

@Setter
public class KafkaGradeStartResponse {
	Integer roomId;
	UUID hostId;
}
