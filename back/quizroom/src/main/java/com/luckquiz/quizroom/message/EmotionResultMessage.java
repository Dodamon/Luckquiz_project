package com.luckquiz.quizroom.message;

import com.luckquiz.quizroom.api.response.QGame;
import com.luckquiz.quizroom.exception.CustomException;
import com.luckquiz.quizroom.exception.CustomExceptionType;
import com.luckquiz.quizroom.model.EmotionResult;
import lombok.Getter;

@Getter
public class EmotionResultMessage {
    private String type;
    private EmotionResult result;

    public void setType(String type){
        this.type = type;
    }

    public void setResult(EmotionResult emotionResult){
        if(emotionResult == null){
            throw new CustomException(CustomExceptionType.FACE_NOT_FOUND);
        }
        this.result = emotionResult;
    }

}
