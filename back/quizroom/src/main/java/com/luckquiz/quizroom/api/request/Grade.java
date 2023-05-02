package com.luckquiz.quizroom.api.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.bind.DefaultValue;

@Getter
@NoArgsConstructor
public class Grade {
    private String playerName;
    private int score_get = 0;
    private int rank_pre = 0;
    private int rank_now = 0;

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public void setScore_get(int score_get) {
        this.score_get = score_get;
    }

    public void setRank_pre(int rank_pre) {
        this.rank_pre = rank_pre;
    }

    public void setRank_now(int rank_now) {
        this.rank_now = rank_now;
    }
}
