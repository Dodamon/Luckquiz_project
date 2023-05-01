package com.luckquiz.grade.api.response;

import java.util.ArrayList;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GradeResponse {
	@Getter
	@Setter
	class grade {
		private String playerName;
		private int score;
		private boolean answer;
		private int scoreGet;
		private int ranking;
	}

	private ArrayList<grade> grades;
	private int total_count;
	private int correct_count;

}

