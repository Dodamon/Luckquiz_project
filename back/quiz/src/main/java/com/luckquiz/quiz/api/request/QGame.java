package com.luckquiz.quiz.api.request;

import com.luckquiz.quiz.db.entity.QuizType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QGame {
    private QuizType type; // game 인지 quiz 인지
    private QuizType quiz; // quiz 일때 3종류 중 뭔지
    private String question;
    private String quizUrl;
    private String answer;
    private List<String> answerList;
    private String one;
    private String two;
    private String three;
    private String four;
    private String game;

    public void setType(QuizType type) {
        this.type = type;
    }

    public void setQuiz(QuizType quiz) {
        this.quiz = quiz;
    }
}
