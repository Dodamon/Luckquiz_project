package com.luckquiz.quizroom.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EnterUser {
    private String sender;
    private int img;

    public void setSender(String sender) {
        this.sender = sender;
    }

    public void setImg(int img) {
        this.img = img;
    }

    @Override
    public int hashCode(){
        if(this.sender == null){
            return 0;
        }
        return (this.sender.hashCode());
    }

    @Override
    public boolean equals(Object obj){
        if(obj instanceof EnterUser){
            EnterUser temp = (EnterUser) obj;
            if(this.sender.equals(temp.sender)){
                return true;
            }
        }
        return false;
    }
}
