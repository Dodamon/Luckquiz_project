package com.luckquiz.grade.api.request;

import lombok.Getter;

@Getter
public class KafkaGradeRequest {
	private Integer roomId;
	private String playerName;
	private Integer quizNum;
	private String answer;
}