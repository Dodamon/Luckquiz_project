package com.luckquiz.quizroom.api.response;

import com.luckquiz.quizroom.model.QuizRoom;
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
    private int id;
    private QuizType type; // game 인지 quiz 인지
    private String quiz; // quiz 일때 3종류 중 뭔지
    private String question;
    private String quizUrl;
    private String answer;
    private List<String> answerList;
    private String one;
    private String two;
    private String three;
    private String four;
    private String game;
    private Integer timer;
    private Integer quizNum;
    private Integer quizSize;
    private String hostNickname;

    public void setType(QuizType type) {
        this.type = type;
    }

    public void setQuiz(String quiz) {
        this.quiz = quiz;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setQuizNum(Integer quizNum) {
        this.quizNum = quizNum;
    }

    public void setQuizSize(Integer quizSize) {
        this.quizSize = quizSize;
    }

    public void setAnswer(String answer){this.answer = answer;}
    public void setHostNickname(String hostNickname){this.hostNickname = hostNickname;}

    public static QGame serveQgame(QGame q){
        QGame qgame = new QGame();
        qgame.game = q.getGame();
        qgame.one = q.getOne();
        qgame.two = q.getTwo();
        qgame.three = q.getThree();
        qgame.four = q.getFour();
        qgame.question = q.getQuestion();
        qgame.quizUrl = q.getQuizUrl();
        qgame.timer = q.getTimer();
        qgame.quizNum = q.getQuizNum();
        qgame.quiz = q.getQuiz();
        qgame.type = q.getType();
        return qgame;
    }

}
