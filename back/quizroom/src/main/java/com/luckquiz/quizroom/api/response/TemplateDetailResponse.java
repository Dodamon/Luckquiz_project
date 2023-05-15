package com.luckquiz.quizroom.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.apache.kafka.clients.producer.ProducerConfig;

import java.util.List;
import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TemplateDetailResponse {
    private int id;
    private String name;
    private UUID hostId;
    private List<QGame> quizList;
    private int quizNum;
    private String isValid;
    private String hostNickName;
    public void setQuizNum(int quizNum) {
        this.quizNum = quizNum;
    }
}

