package com.luckquiz.quizroom.message;

import com.luckquiz.quizroom.model.UserR;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FinalResultMessage {
    private String type;
    private List<UserR> finalResultList;
}
