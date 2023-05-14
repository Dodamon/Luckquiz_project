package com.luckquiz.quiz.api.request;

import lombok.Getter;

import java.util.UUID;

@Getter
public class TemplateDeleteRequest {
    private Integer id;
    private UUID hostId;
}
