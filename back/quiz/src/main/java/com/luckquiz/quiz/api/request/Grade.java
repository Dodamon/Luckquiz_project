package com.luckquiz.quiz.api.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class Grade {
    private String playerName;
    private int playerImg;
    private int scoreGet = 0;
    private int rankPre = 0;
    private int rankNow = 0;
    private int count ;

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public void setScore_get(int scoreGet) {
        this.scoreGet = scoreGet;
    }

    public void setRank_pre(int rankPre) {
        this.rankPre = rankPre;
    }


    public void setRank_now(int rankNow) {
        this.rankNow = rankNow;
    }

    public void setPlayerImg(int playerImg) {
        this.playerImg = playerImg;
    }
}
