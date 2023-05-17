package com.luckquiz.quiz.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "quiz_guest")
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Getter
public class QuizGuest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "template_id")
    private Integer templateId;

    @Column(name = "guest_nickname")
    private String guestNickname;

    @Column(name = "pin_num")
    private int pinNum;

    @Column(name = "count")
    private int correctCount;

    @Column(name = "total_count")
    private int totalCount;

    @Column(name = "score")
    private Double score;

    @Column(name = "quiz_room_id")
    private int quizRoomId;

    @Column(name = "host_id")
    private UUID hostId;

    public void setTemplateId(Integer templateId) {
        this.templateId = templateId;
    }

    public void setGuestNickname(String guestNickname) {
        this.guestNickname = guestNickname;
    }

    public void setPinNum(int pinNum) {
        this.pinNum = pinNum;
    }

    public void setCorrectCount(int correctCount) {
        this.correctCount = correctCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    public void setScore(Double score) {
        this.score = score;
    }
}
