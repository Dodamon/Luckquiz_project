package com.luckquiz.quiz.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.apache.kafka.common.protocol.types.Field;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FourRequest {
    private String textQuestion;
    private String one;
    private String two;
    private String three;
    private String four;

}
