package com.luckquiz.quizRoom.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor
public class QuizRoom {
    private String roomId;
    private String name;
    public static QuizRoom create(String name){
        QuizRoom chatRoom = new QuizRoom();
        chatRoom.roomId = UUID.randomUUID().toString();
        chatRoom.name = name;
        return chatRoom;
    }

}
