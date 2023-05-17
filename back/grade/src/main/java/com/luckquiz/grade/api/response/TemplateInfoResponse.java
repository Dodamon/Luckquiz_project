package com.luckquiz.grade.api.response;

import com.luckquiz.grade.api.common.enums.QuizType;
import com.luckquiz.grade.api.common.exception.CustomException;
import com.luckquiz.grade.api.common.exception.CustomExceptionType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TemplateInfoResponse {
	private Integer id;
	private QuizType quizType;
	private String quiz;
	private String question;
	private String quizUrl;
	private String answer;
	private String one;
	private String two;
	private String three;
	private String four;
	private String[] answerList;
	private String game;
	private Integer timer;

	public void setId(Integer id) {
		this.id = id;
	}

	public QuizType getQuizType() {
		if(quizType==null){
			throw new CustomException(CustomExceptionType.NULL_VALUE_ERROR);
		}
		return quizType;
	}

	public String getQuiz() {
		if(quiz==null){
			throw new CustomException(CustomExceptionType.NULL_VALUE_ERROR);
		}
		return quiz;
	}

	public String getQuestion() {
		if(question==null){
			throw new CustomException(CustomExceptionType.NULL_VALUE_ERROR);
		}
		return question;
	}

	public String getQuizUrl() {
		if(quizUrl==null){
			throw new CustomException(CustomExceptionType.NULL_VALUE_ERROR);
		}
		return quizUrl;
	}

	public String getAnswer() {
		if(answer==null){
			System.out.println("정답이 없습니다.");
			throw new CustomException(CustomExceptionType.NULL_VALUE_ERROR);
		}
		return answer;
	}

	public String getOne() {
		if(one==null){
			throw new CustomException(CustomExceptionType.NULL_VALUE_ERROR);
		}
		return one;
	}

	public String getTwo() {
		if(two==null){
			throw new CustomException(CustomExceptionType.NULL_VALUE_ERROR);
		}
		return two;
	}

	public String getThree() {
		if(three==null){
			throw new CustomException(CustomExceptionType.NULL_VALUE_ERROR);
		}
		return three;
	}

	public String getFour() {
		if(four==null){
			throw new CustomException(CustomExceptionType.NULL_VALUE_ERROR);
		}
		return four;
	}

	public String[] getAnswerList() {

		return answerList;
	}

	public String getGame() {
		if(game==null){
			return "";
		}
		return game;
	}

	public Integer getTimer() {
		if(timer==null){
			throw new CustomException(CustomExceptionType.NULL_VALUE_ERROR);
		}
		return timer;
	}

	public void setQuizType(QuizType quizType) {
		if(quizType==null){
			throw new CustomException(CustomExceptionType.NULL_VALUE_ERROR);
		}
		this.quizType = quizType;
	}

	public void setQuiz(String quiz) {
		this.quiz = quiz;
	}

	public void setQuizUrl(String quizUrl) {
		this.quizUrl = quizUrl;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public void setOne(String one) {
		this.one = one;
	}

	public void setTwo(String two) {
		this.two = two;
	}

	public void setThree(String three) {
		this.three = three;
	}

	public void setFour(String four) {
		this.four = four;
	}

	public void setAnswerList(String[] answerList) {
		this.answerList = answerList;
	}

	public void setTimer(Integer timer) {
		this.timer = timer;
	}

	public void setGame(String game) {
		this.game = game;
	}

	public void setQuestion(String question) {
		this.question = question;
	}
}
