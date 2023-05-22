package com.luckquiz.quiz.api.response;

import io.swagger.models.auth.In;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizRoomGuest {
    Integer rank;
    String nickName;
    Float successRate;
    Integer totalScore;

    public void setRank(Integer rank) {
        this.rank = rank;
    }
}
