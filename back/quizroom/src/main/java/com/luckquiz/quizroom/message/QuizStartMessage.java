package com.luckquiz.quizroom.message;

import com.luckquiz.quizroom.api.response.QGame;
import com.luckquiz.quizroom.model.EnterUser;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QuizStartMessage {
    private String type;
    private QGame getQuizItem;

    public void setType(String type) {
        this.type = type;
    }
    public void setGetQuizItem(QGame getQuizItem){
        this.getQuizItem = getQuizItem;
    }
}
