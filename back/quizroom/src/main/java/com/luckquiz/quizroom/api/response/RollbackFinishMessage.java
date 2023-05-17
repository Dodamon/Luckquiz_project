package com.luckquiz.quizroom.api.response;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class RollbackFinishMessage {
    private Integer roomId;
    private UUID hostId;
}
