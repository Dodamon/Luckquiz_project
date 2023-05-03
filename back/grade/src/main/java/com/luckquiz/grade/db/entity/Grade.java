package com.luckquiz.grade.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class Grade {
	private String playerName;
	private int scoreGet;
	private int rankPre;
	private int rankNow;

}
