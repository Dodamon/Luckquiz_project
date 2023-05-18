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
	private int quizNum;

	public int getCorrectCount() {
		return correctCount;
	}

	private int totalRankNow;
	private int submitCount;
	private int totalCount;
	private boolean done;
	private int correctCount;

	private int totalRankPre;
	private int totalScore;
	public boolean isDone() {
		return done;
	}

	public int getSubmitCount() {
		return submitCount;
	}

	public int getTotalCount() {
		return totalCount;
	}
	public int getTotalScore() {
		return totalScore;
	}



	public int getTotalRankNow() {
		return totalRankNow;
	}

	public int getTotalRankPre() {
		return totalRankPre;
	}

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
