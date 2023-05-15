package com.luckquiz.quiz.api.response;

import com.luckquiz.quiz.api.request.QGame;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    public void setQuizNum(int quizNum){
        this.quizNum = quizNum;
    }

    public void setHostNickName(String hostNickName){
        this.hostNickName = hostNickName;
    }

}
