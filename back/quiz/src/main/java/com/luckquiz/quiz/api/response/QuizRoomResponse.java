package com.luckquiz.quiz.api.response;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.DurationDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.DurationSerializer;
import lombok.*;

import java.time.Duration;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class QuizRoomResponse {
    String title;
    int participantCount;
    int quizCount;
    int gameCount;
    @JsonSerialize(using = DurationSerializer.class)
    @JsonDeserialize(using = DurationDeserializer.class)
    Duration duration;
    double successRate;
}
