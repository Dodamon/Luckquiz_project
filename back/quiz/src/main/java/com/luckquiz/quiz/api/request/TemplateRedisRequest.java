package com.luckquiz.quiz.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TemplateRedisRequest {
    private int templateId;
    private int hostId;

}
