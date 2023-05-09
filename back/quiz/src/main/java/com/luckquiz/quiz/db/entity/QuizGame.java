package com.luckquiz.quiz.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "quiz_game")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class QuizGame {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "template_id", nullable = true)
    private int templateId;
    @Column(name = "type",nullable = true)
    @Enumerated(EnumType.STRING)
    private QuizType type;

    @Column(name = "timer", nullable = true)
    private int timer;

    @Column(name = "quiz", nullable = true)
    private byte[] quiz;

    public void setType(QuizType type) {
        this.type = type;
    }
}