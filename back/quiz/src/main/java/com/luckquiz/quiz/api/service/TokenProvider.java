package com.luckquiz.quiz.api.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.UUID;

@Service
@Slf4j
public class TokenProvider implements InitializingBean {
    private static final String AUTHORITIES_KEY = "role";
    @Value("${app.auth.token-secret}")
    private String SECRET_KEY;

    private Key key;

    @Override
    public void afterPropertiesSet() throws Exception {
        // 주입받은 secret 값을 key로 할당 받기 위해서
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }


    public UUID getUserIdFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(key)
                .parseClaimsJws(token)
                .getBody();

        return UUID.fromString(claims.getSubject());
    }
}
