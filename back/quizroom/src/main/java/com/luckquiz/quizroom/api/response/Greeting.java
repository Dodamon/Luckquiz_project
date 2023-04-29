package com.luckquiz.quizRoom.api.response;

import lombok.Getter;

@Getter
public class Greeting {

    private final String content;

    public Greeting(String content) {
        this.content = content;
    }
}