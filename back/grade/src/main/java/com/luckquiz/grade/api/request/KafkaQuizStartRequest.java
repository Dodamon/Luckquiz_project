package com.luckquiz.grade.api.request;

import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KafkaQuizStartRequest {
	private Integer roomId;
	private UUID hostId;
	private Integer quizNum;
}
