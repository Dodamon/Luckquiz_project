package com.luckquiz.quiz.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizRoomGuest {
    int rank;
    String nickName;
    long successRate;
    Double totalScore;
}
