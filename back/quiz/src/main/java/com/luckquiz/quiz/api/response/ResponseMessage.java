package com.luckquiz.quiz.api.response;

public class ResponseMessage {
    private  String content;

    public ResponseMessage() {

    }

    public ResponseMessage(String content){
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
