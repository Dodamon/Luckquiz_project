package com.luckquiz.quizroom.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TemplateDetailResponse {
    private int id;
    private String name;
    private int hostId;
    private List<TemplateInfoResponse> quizList;
    private String[] numbering;


}

