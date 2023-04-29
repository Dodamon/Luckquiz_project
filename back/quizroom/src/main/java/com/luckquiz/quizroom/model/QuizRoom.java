package com.luckquiz.quizroom.model;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor
public class QuizRoom {
    private String roomId;
    private String roomName;
    public static QuizRoom create(String roomName){
        QuizRoom room = new QuizRoom();
        room.roomId = (int)(Math.random()*10000000)+"";
        room.roomName = roomName;
        return room;
    }
}
