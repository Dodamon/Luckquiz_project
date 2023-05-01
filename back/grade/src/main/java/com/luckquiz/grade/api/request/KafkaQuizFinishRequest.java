package com.luckquiz.grade.api.request;

import lombok.Getter;

@Getter
public class KafkaQuizFinishRequest {
	private String roomId;
	private String quizNum;
}
