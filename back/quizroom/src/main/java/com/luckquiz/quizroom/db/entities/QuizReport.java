package com.luckquiz.quizroom.db.entities;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Table(name = "quiz_report")
public class QuizReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "quiz_game_id", nullable = true)
    private int quizGameId;
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




}
