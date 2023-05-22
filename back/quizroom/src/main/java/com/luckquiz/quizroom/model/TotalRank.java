package com.luckquiz.quizroom.model;

import lombok.Getter;

import java.util.UUID;

@Getter
public class TotalRank {
    private Integer roomId;
    private UUID hostId;
}
