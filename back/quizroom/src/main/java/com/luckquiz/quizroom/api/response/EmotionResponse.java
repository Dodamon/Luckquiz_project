package com.luckquiz.quizroom.api.response;

import com.luckquiz.quizroom.model.EmotionResult;
import lombok.Setter;

import javax.annotation.Nullable;

@Setter
public class EmotionResponse {
    public String type;

    @Nullable
    class Emotion {
        public EmotionResult.ValCon emotion;
    }
    public Emotion emotion;

    public void setEmotion(EmotionResult.ValCon emotion){
        if(this.emotion == null){
            this.emotion = new Emotion();
        }
        this.emotion.emotion=emotion;
    }

}
