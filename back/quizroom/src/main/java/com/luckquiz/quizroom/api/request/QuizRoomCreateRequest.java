package com.luckquiz.quizroom.api.request;

import lombok.Getter;

import java.util.UUID;

@Getter
public class QuizRoomCreateRequest {
    private UUID hostId;
    private int roomId;
    private int templateId;
}
