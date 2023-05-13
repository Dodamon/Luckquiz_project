package com.luckquiz.quizroom.message;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.PrimitiveIterator;
@Getter
@AllArgsConstructor
@Builder
public class TurnEndResponse {
    private String type;
    private String quizEnd;

    public void setType(String type) {
        this.type = type;
    }

    public void setQuizEnd(String quizEnd) {
        this.quizEnd = quizEnd;
    }
}
