package com.luckquiz.grade.db.entity;

import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuizStart {
	Integer roomId;
	UUID hostId;
}
