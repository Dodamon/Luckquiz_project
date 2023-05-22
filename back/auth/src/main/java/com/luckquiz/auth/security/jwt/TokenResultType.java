package com.luckquiz.auth.security.jwt;

public enum TokenResultType {
    VALID,
    INVALID,
    EXPIRED,
    UNSUPPORTED,
    CLAIMS_EMPTY
}