package com.luckquiz.quiz.api.request;

import lombok.Getter;

import java.util.UUID;

@Getter
public class FinalRequest {
    private UUID hostId;
    private Integer roomId;
}
