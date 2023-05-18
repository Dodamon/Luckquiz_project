package com.luckquiz.quiz.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Slice;

import java.util.List;
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QuestionsWithTemplateNameResponse {
    private String title;
    private Slice<QuizRoomQuestion> slice;
}
