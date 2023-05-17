package com.luckquiz.grade.api.response;

import java.util.List;
import java.util.UUID;

import com.luckquiz.grade.api.common.exception.CustomException;
import com.luckquiz.grade.api.common.exception.CustomExceptionType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TemplateDetailResponse {
	private int id;
	private String name;
	private UUID hostId;
	private List<TemplateInfoResponse> quizList;
	private Integer quizNum;
	private String hostNickName;

	public void setQuizNum(Integer quizNum) {
		this.quizNum = quizNum;
	}

	public String getName() {
		if(getName()==null){
			throw new CustomException(CustomExceptionType.NULL_VALUE_ERROR);
		}
		return name;
	}

	public List<TemplateInfoResponse> getQuizList() {
		if(this.quizList==null){
			System.out.println("야이넘아 퀴즈 리스트 비었다.");
			throw new CustomException(CustomExceptionType.NULL_VALUE_ERROR);
		}
		return quizList;
	}

	public Integer getQuizNum() {
		if(quizNum==null){
			throw new CustomException(CustomExceptionType.NULL_VALUE_ERROR);
		}
		return quizNum;
	}

	public UUID getHostId() {
		return hostId;
	}
}
