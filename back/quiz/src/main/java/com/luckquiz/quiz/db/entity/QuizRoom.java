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
    @Column(name = "template_id", nullable = false)
    private int templateId;
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
    private UUID hostId; // 추가
    @Column(name = "pin_num",nullable = true)
    private Integer pinNum;
    @Column(name = "quiz_count", nullable = true)
    private int quizCount;
    @Column(name = "game_count", nullable = true)
    private int gameCount;

    @Column(name = "template_name")
    private String templateName;

    public void setTemplateId(int templateId) {
        this.templateId = templateId;
    }
    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public void setInactive(boolean inactive) {
        this.inactive = inactive;
    }

    public void setFinishedTime(LocalDateTime finishedTime) {
        this.finishedTime = finishedTime;
    }

    public void setParticipantCount(int participantCount) {
        this.participantCount = participantCount;
    }

    public void setSubmitCount(int submitCount) {
        this.submitCount = submitCount;
    }

    public void setCorrectCount(int correctCount) {
        this.correctCount = correctCount;
    }

    public void setHostId(UUID hostId) {
        this.hostId = hostId;
    }

    public void setQuizCount(int quizCount) {
        this.quizCount = quizCount;
    }

    public void setGameCount(int gameCount) {
        this.gameCount = gameCount;
    }

    public void setTemplateName(String templateName){this.templateName = templateName;}

    public void setPinNum(int pinNum){this.pinNum = pinNum;}
}
