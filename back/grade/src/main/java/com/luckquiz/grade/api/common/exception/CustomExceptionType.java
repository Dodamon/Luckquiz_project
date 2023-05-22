package com.luckquiz.grade.api.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum CustomExceptionType {
	TEMPLATE_NOT_FOUND(HttpStatus.NOT_ACCEPTABLE, "101", "해당하는 템플릿이 없습니다."),
	QUIZ_NOT_FOUND(HttpStatus.NOT_ACCEPTABLE,"102","해당하는 퀴즈가 없습니다."),
	RUNTIME_ERROR(HttpStatus.BAD_REQUEST ,"103","런타임 에러 입니다."),
	INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR,"104","뭔가 단단히 잘못되었읍니다."),
	KAFKA_SERIALIZE_ERROR(HttpStatus.BAD_REQUEST,"105","카프카 SERIALIZE가 안됩니다."),
	NULL_VALUE_ERROR(HttpStatus.BAD_REQUEST,"106","필요한 값중 하나가 빈 값입니다."),
	FACE_NOT_FOUND(HttpStatus.BAD_REQUEST,"107","얼굴이 발견되지 않았습니다."),
	QUIZ_NUM_ERROR(HttpStatus.BAD_REQUEST,"108","퀴즈 번호가 다릅니다.");
	private final HttpStatus httpStatus;
	private final String code;
	private String message;

	CustomExceptionType(HttpStatus httpStatus, String code) {
		this.httpStatus = httpStatus;
		this.code = code;
	}

	CustomExceptionType(HttpStatus httpStatus, String code, String message) {
		this.httpStatus = httpStatus;
		this.code = code;
		this.message = message;
	}

}

