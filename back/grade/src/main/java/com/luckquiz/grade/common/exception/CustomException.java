package com.luckquiz.grade.common.exception;

public class CustomException extends RuntimeException{
	private final CustomExceptionType exception;
	public CustomException(CustomExceptionType exception){
		super(exception.getMessage());
		this.exception = exception;
	}
	public CustomExceptionType getException(){
		return exception;
	}
}

