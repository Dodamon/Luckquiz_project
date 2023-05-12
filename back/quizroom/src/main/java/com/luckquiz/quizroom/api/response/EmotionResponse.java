package com.luckquiz.quizroom.api.response;

import com.luckquiz.quizroom.model.EmotionResult;
import lombok.Setter;

import javax.annotation.Nullable;

@Setter
public class EmotionResponse {
    public String type;


    public  EmotionResult.ValCon emotion;


}
