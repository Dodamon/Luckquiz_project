package com.luckquiz.quiz.db.entity;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.UUID;

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

    @Column(name = "quiz_room_id")
    private int quizRoomId;

    @Column(name = "user_id")
    private UUID userId;

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

    public void setQuizRoomId(int quizRoomId) {
        this.quizRoomId = quizRoomId;
    }

    public void setPinNum(Integer pinNum) {
        this.pinNum = pinNum;
    }
    public void setUserId(UUID userId){ this.userId = userId; }
}
