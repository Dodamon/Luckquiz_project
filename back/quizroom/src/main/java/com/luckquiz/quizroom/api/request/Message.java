package com.luckquiz.quizRoom.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Message {
    private String type;
    private String sender;
    private String roomId;
    private String message;
    private Object data;
    public void setSender(String sender){
        this.sender = sender;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void newConnect(){
        this.type = "new";
    }
    public void closeConnect(){
        this.type = "close";
    }
}
