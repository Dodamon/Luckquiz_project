package com.luckquiz.quizroom.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.LinkedHashMap;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KafkaGradeEndMessage {
    private Integer roomId;
    private Integer count;
    private Integer solvedCount;
    private Integer quizNum;
    private int connectionCount;
    private int correctCount;
    private Double correctRate;
    private LinkedHashMap<String, Double> answerData;
}
