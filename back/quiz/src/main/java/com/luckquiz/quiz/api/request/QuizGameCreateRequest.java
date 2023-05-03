package com.luckquiz.quiz.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class QuizGameCreateRequest {
    private int templateId;
    private int hostId;
    private List<Integer> numbering;
    private List<QGame> quizList;
    private int timer;
}
