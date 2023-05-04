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
    @Column(name = "id", nullable = false)
    private int id;
    @Column(name = "template_id", nullable = true)
    private int templateId;
    @Column(name = "type",nullable = false)
    @Enumerated(EnumType.STRING)
    private QuizType type;
    @Column(name = "timer", nullable = false)
    private int timer;

    @Column(name = "quiz", nullable = true)
    private byte[] quiz;

}
