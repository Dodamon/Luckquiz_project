package com.luckquiz.quiz.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class QuizRoomListwithTemplateResponse {
    private String title;
    private List<QuizRoomListResponse> list;
}
