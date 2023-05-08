package com.luckquiz.quizroom.model;

import lombok.Getter;

@Getter
public class UserL {
    private String sender;
    private int img;

    public void setSender(String sender) {
        this.sender = sender;
    }

    public void setImg(int img) {
        this.img = img;
    }
}
