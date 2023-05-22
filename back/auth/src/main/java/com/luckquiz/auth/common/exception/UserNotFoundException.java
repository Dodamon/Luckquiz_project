package com.luckquiz.auth.common.exception;

public class UserNotFoundException extends AuthenticationException {
    public UserNotFoundException() {
        super("사용자를 찾을 수 없습니다");
    }
}
