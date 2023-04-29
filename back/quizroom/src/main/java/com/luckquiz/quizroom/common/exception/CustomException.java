package com.luckquiz.quizRoom.common.exception;


// 런타임 exception을 상속받기.
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


