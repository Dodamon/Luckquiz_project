package com.luckquiz.quizroom.model;

import com.luckquiz.quizroom.api.response.TemplateDetailResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
public class SessionContext {
    private String sessionId;
    private int quizNum;
    private int totalQuizCount;
    private TemplateDetailResponse templateDetailResponse;

    public void setQuizNum(int quizNum) {
        this.quizNum = quizNum;
    }
}
