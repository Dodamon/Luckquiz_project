package com.luckquiz.quiz.api.request;

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
    private Integer solveCount;
    private Integer quizNum;
    private int correctCount;
    private int connectionCount;
    private Double correctRate;
    private LinkedHashMap<String, Double> answerData;;
}
