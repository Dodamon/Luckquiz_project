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

//guest들이
// /topic/quiz/{roomId} 모든 유저가 구독하는 곳.
// /queue/quiz/{roomId}/{username} 1개씩.
