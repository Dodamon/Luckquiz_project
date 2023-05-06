package com.luckquiz.quizroom.model;

import lombok.Getter;

@Getter
public class UserL {
    private String sender;
    private String img;

    public void setSender(String sender) {
        this.sender = sender;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
