package com.luckquiz.auth.security.jwt;

import com.luckquiz.auth.security.service.CustomUserDetailsService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Key;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class TokenAuthenticationFilter extends OncePerRequestFilter {

    private final TokenProvider tokenProvider;
    private final CustomUserDetailsService customUserDetailsService;

    @Value("${app.auth.token-secret}")
    private String SECRET_KEY;
    private Key key;

    @Override
    public void afterPropertiesSet() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String accesstoken = getJwtFromRequest(request);
            log.info("this tis token authentication filter");

            if (!StringUtils.hasText(accesstoken)) {
                log.error("엑세스 토큰이 비어있습니다");
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "토큰이 존재하지 않습니다");
                return;
            }

            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(key).parseClaimsJws(accesstoken);

        } catch (SignatureException ex) {
            log.error("Unsupported Signature");
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, ex.getMessage());
            return;
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage());
            return;
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");
            // access token이 만료됐을 때
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage());
            return;
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, ex.getMessage());
            return;
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty.");
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, ex.getMessage());
            return;
        } catch (Exception ex) {
            log.error(ex.toString());
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ex.getMessage());
            return;
        }

//            tokenProvider.validateToken(accesstoken);
//            log.info("토큰을 세션에 올립니다");
//            UUID userId = tokenProvider.getUserIdFromToken(accesstoken);
//            UserDetails userDetails = customUserDetailsService.loadUserById(userId);
//            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//
//        } catch (Exception ex) {
//            logger.error("Could not set user authentication in security context", ex);
//            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "토큰이 이상합니다..");
//            return;
//        }
        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }
}