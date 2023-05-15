package com.luckquiz.grade.db.entity;

import java.io.Serializable;

import com.luckquiz.grade.api.common.exception.CustomException;
import com.luckquiz.grade.api.common.exception.CustomExceptionType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Grade implements Serializable{
	private String playerName;
	private int scoreGet;
	private int rankPre;
	private int rankNow;
	private int playerImg;

	private int count;
	public String getPlayerName() {
		if(playerName==null){
			throw new CustomException(CustomExceptionType.NULL_VALUE_ERROR);
		}
		return playerName;
	}

	public int getScoreGet() {
		return scoreGet;
	}

	public int getRankPre() {
		return rankPre;
	}

	public int getRankNow() {
		return rankNow;
	}

	public int getPlayerImg() {
		return playerImg;
	}

	public int getCount() {
		return count;
	}
}
