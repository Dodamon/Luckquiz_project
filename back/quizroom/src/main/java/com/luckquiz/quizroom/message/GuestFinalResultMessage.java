package com.luckquiz.quizroom.message;

import com.luckquiz.quizroom.model.UserR;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GuestFinalResultMessage {
    private String type;
    private UserR guestFinalResultMessage;
}
