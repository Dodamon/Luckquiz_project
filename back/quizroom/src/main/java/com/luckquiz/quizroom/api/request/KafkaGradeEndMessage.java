package com.luckquiz.quizroom.api.request;

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
    private Integer solvedCount;
    private Integer quizNum;
}
