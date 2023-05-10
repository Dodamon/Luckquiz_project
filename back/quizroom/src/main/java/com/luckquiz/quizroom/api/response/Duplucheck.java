package com.luckquiz.quizroom.api.response;

import lombok.Getter;

@Getter
public class Duplucheck {
    private String checkGuestName;
    private String type;

    public void setCheckGuestName(String checkGuestName){
        this.checkGuestName = checkGuestName;

    }
    public void setType(String type){
        this.type = type;
    }
}
