package com.luckquiz.quizRoom.api.request;

import lombok.Getter;

@Getter
public class QuizMessage {
    public enum MessageType{
        ENTER,ANSWER
    }
    private MessageType type;
    private String roomId;
    private String sender;
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
}
