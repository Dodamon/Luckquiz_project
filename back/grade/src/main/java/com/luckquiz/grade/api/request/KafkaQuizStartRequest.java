package com.luckquiz.grade.api.request;

import lombok.Getter;

@Getter
public class KafkaQuizStartRequest {
	private String roomId;
	private String quizNum;
}
