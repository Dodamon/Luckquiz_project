package com.luckquiz.quiz.api.response;

import io.swagger.models.auth.In;
import lombok.Getter;

@Getter
public class EnterUser {
    private String sender;
    private Integer img;
    public void setSender(String sender){
        this.sender = sender;
    }
    public void setImg(Integer img){
        this.img = img;
    }
}
