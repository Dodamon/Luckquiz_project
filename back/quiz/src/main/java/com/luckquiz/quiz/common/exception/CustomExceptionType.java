package com.luckquiz.quiz.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum CustomExceptionType {
    TEMPLATE_NOT_FOUND(HttpStatus.NOT_ACCEPTABLE, "101", "해당하는 템플릿이 없습니다."),
    QUIZ_NOT_FOUND(HttpStatus.NOT_ACCEPTABLE,"102","해당하는 퀴즈가 없습니다."),
    RUNTIME_ERROR(HttpStatus.BAD_REQUEST ,"103","런타임 에러 입니다."),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR,"104","뭔가 단단히 잘못되었읍니다."),
    NO_TIMER_ERROR(HttpStatus.NOT_ACCEPTABLE,"105","타이머를 입력안했읍니다."),
    NO_QUESTION_ERROR(HttpStatus.NOT_ACCEPTABLE,"106","질문을 입력안했읍니다."),
    NO_ANSWER_ERROR(HttpStatus.NOT_ACCEPTABLE,"107","답안을 입력안했읍니다."),
    NO_FOUR_ERROR(HttpStatus.NOT_ACCEPTABLE,"108","4지선다 보기를 입력안했읍니다."),
    NO_ANSWERLIST_ERROR(HttpStatus.NOT_ACCEPTABLE,"109","인정답안 목록을 입력안했읍니다."),
    NO_GAME_ERROR(HttpStatus.NOT_ACCEPTABLE,"110","어떤 게임인지 안정했읍니다."),
    KAFKA_SERIALIZE_ERROR(HttpStatus.BAD_REQUEST,"110","카프카 SERIALIZE가 안됩니다."),
    NULL_VALUE_ERROR(HttpStatus.BAD_REQUEST,"111","필요한 값중 하나가 빈 값입니다."),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND,"112","해당하는 유저가 없읍니다.");
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
