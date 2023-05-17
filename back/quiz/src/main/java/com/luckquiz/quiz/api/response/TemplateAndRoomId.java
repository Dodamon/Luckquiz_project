package com.luckquiz.quiz.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TemplateAndRoomId {
    private int roomId;
    private int templateId;
    private int roomPk;

    private String templateName;
}
