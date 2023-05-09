package com.luckquiz.grade.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class KafkaGradeEndResponse {
	Integer roomId;
	Integer count;
	Integer solvedCount;
	Integer quizNum;
}
