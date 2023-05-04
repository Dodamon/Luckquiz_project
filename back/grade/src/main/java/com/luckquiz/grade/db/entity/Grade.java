package com.luckquiz.grade.db.entity;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Grade implements Serializable{
	private String playerName;
	private int scoreGet;
	private int rankPre;
	private int rankNow;

}
