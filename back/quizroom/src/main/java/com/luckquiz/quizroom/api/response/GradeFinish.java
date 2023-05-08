package com.luckquiz.quizroom.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GradeFinish {
    //
    Integer roomId;
    Integer count;
    Integer solvedCount;
    Integer quizNum;
}