package com.luckquiz.auth.common.exception;

public class InvalidTokenException extends JwtException {
    public InvalidTokenException() {
        super("유효하지 않은 토큰입니다");
    }
}