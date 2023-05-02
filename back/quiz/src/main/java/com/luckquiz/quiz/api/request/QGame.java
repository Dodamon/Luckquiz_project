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
    public QuizType type;

    public Quiz quiz;
    public String question;
    public String quizUrl;
    public String answer;
    public List<String> answerList;
    public String one;
    public String two;
    public String three;
    public String four;
    public String game;

}
