package com.luckquiz.grade.api.request;

import lombok.Getter;

@Getter
public class KafkaGradeRequest {
	private String roomId;
	private String playerName;
	private String quizNum;
	private String answer;
}