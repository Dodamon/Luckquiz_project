package com.luckquiz.quizroom.model;

import lombok.Getter;

@Getter
public class SubmitMessage {
    private String sender;
    private String roomId;
    private int quizNum;
    private String answer;

    public void setSender(String sender) {
        this.sender = sender;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public void setQuizNum(int quizNum) {
        this.quizNum = quizNum;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}
