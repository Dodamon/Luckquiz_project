package com.luckquiz.quizroom.api.request;

import java.util.LinkedHashMap;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KafkaGradeEndMessage {

    private Integer roomId;
    private Integer count;
    private Integer connectionCount;
    private Integer solveCount;
    private Integer correctCount;
    private Double correctRate;
    private Integer quizNum;
    private LinkedHashMap<String, Double> answerData;
}
