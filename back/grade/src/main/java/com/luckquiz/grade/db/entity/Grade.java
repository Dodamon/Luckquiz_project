package com.luckquiz.grade.db.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Grade{
	private String playerName;
	private int score_pre;
	private int score_now;
	private int rank_pre;
	private int rank_now;

}
