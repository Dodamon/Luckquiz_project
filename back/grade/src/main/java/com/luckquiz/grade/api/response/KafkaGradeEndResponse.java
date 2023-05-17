package com.luckquiz.grade.api.response;

import java.util.LinkedHashMap;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class KafkaGradeEndResponse {
	private Integer roomId;
	private Integer connectionCount;
	private Integer solveCount;
	private Integer correctCount;
	private Double correctRate;
	private Integer quizNum;
	private LinkedHashMap<String, Integer> answerData;
}
