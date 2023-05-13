package com.luckquiz.quizroom.api.response;

import lombok.Getter;

import javax.persistence.criteria.CriteriaBuilder;

@Getter
public class GradeEndMessage {
    private Integer roomId;
    private Integer count;
    private Integer solvedCount;
    private Integer quizNum;
}
