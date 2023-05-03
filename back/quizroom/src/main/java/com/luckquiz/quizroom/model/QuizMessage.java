package com.luckquiz.quizroom.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class QuizMessage {
    public enum MessageType{
        ENTER,SUBMIT
    }
    private MessageType type;
    private String roomId;
    private String sender;
    private int img;

    private String message;

    public void setType(MessageType type) {
        this.type = type;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setImg(int img) {
        this.img = img;
    }
}
