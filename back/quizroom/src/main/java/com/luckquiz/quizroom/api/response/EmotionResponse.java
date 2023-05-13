package com.luckquiz.quizroom.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Setter;

import javax.annotation.Nullable;


@Setter
public class EmotionResponse {
    public String type;


    @Nullable
    public EmotionResult emotionResult;


    @Setter
    @AllArgsConstructor
    @Builder
    public static class EmotionResult {
        @Nullable
        public com.luckquiz.quizroom.model.EmotionResult.ValCon emotion;
        @Nullable
        public com.luckquiz.quizroom.model.EmotionResult.Roi roi;
    }
}
