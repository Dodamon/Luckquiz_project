package com.luckquiz.quizroom.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizRoomStartRequest {
    private int hostId;
    private int templateId;
}
