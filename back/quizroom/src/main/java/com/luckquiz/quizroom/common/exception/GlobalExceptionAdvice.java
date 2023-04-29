package com.luckquiz.quizRoom.common.exception;

import com.luckquiz.quizRoom.api.response.ExceptionResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionAdvice {
    //1. 에러가 우리 customException에서 잡아낸 에러
    @ExceptionHandler(value = CustomException.class)
    public ResponseEntity<ExceptionResponse> customExceptionHandler(CustomException e){
        return getResponseEntity(e.getException());
    }
    //2. 에러가 CustomException에서 잡아내지 못했지만, RuntimeException인 경우
    @ExceptionHandler(value = RuntimeException.class)
    public ResponseEntity<ExceptionResponse> runtimeExceptionHandler(RuntimeException exception){
        log.info(exception.getMessage());
        return getResponseEntity(CustomExceptionType.RUNTIME_ERROR);
    }
    //3. 에러가 CustomException에서 못잡고, Runtime Exception이 아닌 모든 Exception
    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<ExceptionResponse> exceptionHandler(Exception e){
        log.info(e.getMessage());
        return getResponseEntity(CustomExceptionType.INTERNAL_SERVER_ERROR);
    }
    // 위의 경우 모두 CustomExceptionType으로 처리할 수 있도록 만들기.

    public ResponseEntity<ExceptionResponse> getResponseEntity(CustomExceptionType exception){
        return ResponseEntity.status(exception.getHttpStatus())
                .body(ExceptionResponse.builder()
                        .code(exception.getCode())
                        .message(exception.getMessage())
                        .build());
    }
}
