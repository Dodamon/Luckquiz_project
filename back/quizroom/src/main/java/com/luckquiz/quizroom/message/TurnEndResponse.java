package com.luckquiz.quizroom.message;

import com.luckquiz.quizroom.api.response.TurnEndGraph;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.PrimitiveIterator;
@Getter
@AllArgsConstructor
@Builder
public class TurnEndResponse {
    private String type;
    private List<TurnEndGraph> quizEnd;

    public void setType(String type) {
        this.type = type;
    }

    public void setQuizEnd(List<TurnEndGraph> quizEnd) {
        this.quizEnd = quizEnd;
    }
}
