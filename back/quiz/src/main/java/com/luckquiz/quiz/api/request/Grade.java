package com.luckquiz.quiz.api.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.bind.DefaultValue;

@Getter
@NoArgsConstructor
public class Grade implements Comparable<Grade>{
    private String playerName;
    private int playerImg;
    private int scoreGet;
    private int rankPre;
    private int rankNow;
    private int count;
    private int quizNum;
    private int totalRankPre;
    private int totalRankNow;
    private int totalScore;
    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }
    public void setScoreGet(int scoreGet) {
        this.scoreGet = scoreGet;
    }
    public void setRankPre(int rankPre) {
        this.rankPre = rankPre;
    }
    public void setRankNow(int rankNow) {
        this.rankNow = rankNow;
    }
    public void setPlayerImg(int playerImg) {
        this.playerImg = playerImg;
    }
    public void setQuizNum(int quizNum){
        this.quizNum = quizNum;
    }
    @Override
    public int compareTo(Grade o) {
        return o.getScoreGet() - getScoreGet();
    }
}
