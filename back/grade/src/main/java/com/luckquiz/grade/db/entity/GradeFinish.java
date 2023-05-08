package com.luckquiz.grade.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class GradeFinish {
	Integer roomId;
	Integer count;
	Integer solvedCount;
	Integer quizNum;
}
