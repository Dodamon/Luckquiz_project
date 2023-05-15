package com.luckquiz.quizroom.message;

import com.luckquiz.quizroom.api.request.Grade;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class HostTurnEndMessage {
    private String type;
    private List<Grade> userLList;
    public void setType(String type){
        this.type = type;
    }
    public void setUserLList(List<Grade> userLList){
        this.userLList = userLList;
    }
}
