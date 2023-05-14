package com.luckquiz.quizroom.api.request;

import com.luckquiz.quizroom.api.response.EmotionResponse;
import com.luckquiz.quizroom.model.EmotionResult;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.apache.kafka.common.metrics.internals.IntGaugeSuite;

import javax.persistence.criteria.CriteriaBuilder;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmotionSubmit {
    private Integer roomId;
    private String sender;
    private Integer quizNum;
    private com.luckquiz.quizroom.model.EmotionResult.ValCon emotionResult;
}
