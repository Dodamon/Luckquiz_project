package com.luckquiz.quizroom.api.request;

import com.luckquiz.quizroom.model.UserR;
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
    @Override
    public int compareTo(Grade o) {
        return o.getScoreGet() - getScoreGet();
    }
}
