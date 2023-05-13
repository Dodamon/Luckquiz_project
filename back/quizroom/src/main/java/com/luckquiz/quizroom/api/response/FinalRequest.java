package com.luckquiz.quizroom.api.response;

import lombok.Getter;
import org.apache.kafka.common.protocol.types.Field;

import java.util.UUID;

@Getter
public class FinalRequest {
    private UUID hostId;
    private Integer roomId;
}
