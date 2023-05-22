package com.luckquiz.quizroom.model;

import lombok.Getter;

import javax.persistence.criteria.CriteriaBuilder;

@Getter
public class ShutDownRequest {
    private Integer roomId;
}
