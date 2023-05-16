package com.luckquiz.quiz.db.entity;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "quiz_report")
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Getter
public class QuizReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "quiz_game_id", nullable = true)
    private int quizGameId;

    @Column(name = "question")
    private String question;
    //count임
    @Column(name = "correct_count", nullable = true)
    private int correctCount;

    //나중에 생각해보기. - 정답률 구하기 위함
    @Column(name = "submit_count",nullable = true)
    private int submitCount;

    @JoinColumn(name = "quiz_room_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private QuizRoom quizRoom;

    @Column(name = "pin_num")
    private Integer pinNum;

    public void setQuizGameId(int quizGameId) {
        this.quizGameId = quizGameId;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public void setCorrectCount(int correctCount) {
        this.correctCount = correctCount;
    }

    public void setSubmitCount(int submitCount) {
        this.submitCount = submitCount;
    }

    public void setQuizRoom(QuizRoom quizRoom) {
        this.quizRoom = quizRoom;
    }

    public void setPinNum(Integer pinNum) {
        this.pinNum = pinNum;
    }
}
