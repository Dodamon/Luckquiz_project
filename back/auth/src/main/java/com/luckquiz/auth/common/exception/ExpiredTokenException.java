package com.luckquiz.auth.common.exception;

public class ExpiredTokenException extends JwtException {
    public ExpiredTokenException() {
        super("토큰이 만료되었습니다");
    }
}