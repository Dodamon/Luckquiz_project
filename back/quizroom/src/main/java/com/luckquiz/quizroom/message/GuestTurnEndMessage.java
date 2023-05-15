package com.luckquiz.quizroom.message;

import com.luckquiz.quizroom.api.response.UserTurnEndResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
public class GuestTurnEndMessage {
        private String type;
        private UserTurnEndResponse userTurnEndResponse;
        public void setType(String type){
            this.type = type;
        }
        public void setUserTurnEndResponse(UserTurnEndResponse userTurnEndResponse){
            this.userTurnEndResponse = userTurnEndResponse;
        }
}
