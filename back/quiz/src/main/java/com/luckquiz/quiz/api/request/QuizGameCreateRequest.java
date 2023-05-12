package com.luckquiz.quiz.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class QuizGameCreateRequest {
    private int templateId;
    private UUID hostId;
    private List<QGame> quizList;
    private int timer;

    public void setQuizList(List<QGame> quizList){
        this.quizList = quizList;
    }


}
