package com.luckquiz.quizroom.model;

import com.luckquiz.quizroom.api.response.TemplateDetailResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SessionContext {
    private String sessionId;
    private int quiz_num;
    private int total_quiz_count;
    private TemplateDetailResponse templateDetailResponse;
}
