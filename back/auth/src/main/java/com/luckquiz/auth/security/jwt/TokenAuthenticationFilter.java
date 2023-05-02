package com.luckquiz.auth.security.jwt;

import com.luckquiz.auth.security.service.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class TokenAuthenticationFilter extends OncePerRequestFilter {

    private final TokenProvider tokenProvider;
    private final CustomUserDetailsService customUserDetailsService;

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

            tokenProvider.validateToken(accesstoken);
            log.info("토큰을 세션에 올립니다");
            UUID userId = tokenProvider.getUserIdFromToken(accesstoken);
            UserDetails userDetails = customUserDetailsService.loadUserById(userId);
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (Exception ex) {
            logger.error("Could not set user authentication in security context", ex);
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "토큰이 이상합니다..");
            return;
        }
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