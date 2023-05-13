package com.luckquiz.quizroom.api.response;

import com.luckquiz.quizroom.model.EmotionResult;
import lombok.Setter;


@Setter
public class EmotionResponse {
    public String type;
    @Setter
    public class EmotionResult {
        public com.luckquiz.quizroom.model.EmotionResult.ValCon emotion;
        public com.luckquiz.quizroom.model.EmotionResult.Roi roi;
    }

    public EmotionResult emotionResult;



}
