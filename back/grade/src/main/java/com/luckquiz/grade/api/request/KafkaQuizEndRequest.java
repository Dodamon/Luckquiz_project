package com.luckquiz.grade.api.request;

import lombok.Getter;

@Getter
public class KafkaQuizEndRequest {
	private Integer roomId;
	private Integer quizNum;
}
