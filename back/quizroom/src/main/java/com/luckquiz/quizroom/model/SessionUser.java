package com.luckquiz.quizroom.model;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SessionUser {
    private String sender;
    private String senderUrl;

    public void setSender(String sender) {
        this.sender = sender;
    }

    public void setSenderUrl(String senderUrl) {
        this.senderUrl = senderUrl;
    }
}
