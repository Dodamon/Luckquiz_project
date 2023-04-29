package com.luckquiz.quizRoom.api.webSocketMessageSpec;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class Message {
    private String type;
    private String sender;
    private String channelId;
    private String data;

    public void setSender(String sender) {
        this.sender = sender;
    }
    public void newConnect() {
        this.type = "connected";
    }
    public void closeConnect() {
        this.type = "close";
    }
}
