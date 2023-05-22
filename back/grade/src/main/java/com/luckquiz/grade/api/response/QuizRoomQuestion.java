package com.luckquiz.quiz.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizRoomQuestion {
    Integer num;
    String problem;
    Float successRate;

    public void setNum(Integer num) {
        this.num = num;
    }
}
