package com.luckquiz.quizroom.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class QuizMessage {
    private String hostId;
    private int roomId;
    private String sender;
    private int img;
    private int quizNum;
    private String message;
    private String file;

    public void setHostId(String hostId) {
        this.hostId = hostId;
    }

    public void setRoomId(int roomId) {
        this.roomId = roomId;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setImg(int img) {
        this.img = img;
    }

    public void setFile(String file) {
        this.file = file;
    }
}
