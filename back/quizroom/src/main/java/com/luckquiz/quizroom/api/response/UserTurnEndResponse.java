package com.luckquiz.quizroom.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserTurnEndResponse {
    private int scoreGet;
    private String isUp;
    private int rankDiff;
    private int quizNum;

    public void setScoreGet(int scoreGet){
        this.scoreGet = scoreGet;
    }
    public void setIsUp(String isUp){
        this.isUp = isUp;
    }
    public void setRankDiff(int rankDiff){
        this.rankDiff = rankDiff;
    }
    public void setQuizNum(int quizNum){this.quizNum = quizNum;}
}
