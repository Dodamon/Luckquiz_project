package com.luckquiz.quizroom.model;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor
public class QuizRoom {
    private String roomId;
    public static QuizRoom create(){
        QuizRoom room = new QuizRoom();
        room.roomId = (int)(Math.random()*10000000)+"";

        while(room.roomId.toString().length() != 7){
            room.roomId = (int)(Math.random()*10000000)+"";
        }
        return room;
    }
}
