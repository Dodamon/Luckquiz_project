package com.luckquiz.quiz.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TemplateDetailResponse {
    private int id;
    private String name;
    private UUID hostId;
    private List<TemplateInfoResponse> quizList;
    private String[] numbering;


}
