package com.luckquiz.quiz.api.service;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class TemplateListResponse {
    private String name;
    private int templateId;
    private String date;
    private String isValid;
    
}
