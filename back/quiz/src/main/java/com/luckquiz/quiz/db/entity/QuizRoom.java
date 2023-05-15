package com.luckquiz.quiz.db.entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "quiz_room")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class QuizRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)  // 우리 걍 id 아닙니까....? ㅇㅅㅇ
    private int id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "template_id", nullable = false)
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private Template template;
    @Column(name = "created_time", nullable = false)
    private LocalDateTime createdTime;
    @Column(name = "inactive", nullable = false)
    private boolean inactive;
    @Column(name = "finished_time", nullable = true)
    private LocalDateTime finishedTime;
    @Column(name = "participant_count", nullable = true)
    private int participantCount;
    @Column(name = "submit_count", nullable = true)
    private int submitCount;
    @Column(name = "correct_count", nullable = true)
    private int correctCount;
    @Column(name = "host_id")
    private UUID hostId;
    @Column(name = "pin_num",nullable = true)
    private Integer pinNum;
}
