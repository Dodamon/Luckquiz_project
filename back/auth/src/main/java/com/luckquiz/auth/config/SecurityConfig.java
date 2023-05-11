package com.luckquiz.auth.config;


import com.luckquiz.auth.security.handler.OAuth2AuthenticationFailureHandler;
import com.luckquiz.auth.security.handler.OAuth2AuthenticationSuccessHandler;
import com.luckquiz.auth.security.jwt.TokenAuthenticationFilter;
import com.luckquiz.auth.security.repository.HttpCookieOAuth2AuthorizationRequestRepository;
import com.luckquiz.auth.security.service.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;

    private final HttpCookieOAuth2AuthorizationRequestRepository cookieOAuth2AuthorizationRequestRepository;
    // 사용자의 인증 요청을 임시로 보관하는 리포지토리에 대한 설정
    // 인증 과정을 모두 마친 후 리다이렉트할 프론트의 URI가 담겨있다.
    private final CustomOAuth2UserService customOAuth2UserService;
    private final CorsConfigurationSource corsConfigurationSource;
    private final TokenAuthenticationFilter tokenAuthenticationFilter;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .cors().configurationSource(corsConfigurationSource)
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                // jwt token으로 인증처리하기 때문에 stateless
                .and()

                .csrf().disable()
                // html tag 를 통한 공격  ( api 서버 이용시 disable() )
                // rest api이므로 csrf 보안이 필요없으므로 disable로 설정
                .formLogin().disable()
                // formLogin 대신 Jwt를 사용하기 때문에 disable로 설정
                .httpBasic().disable()
                // Http basic Auth 기반으로 로그인 인증창이 뜸. 기본 인증 로그인을 이용하지 않으면 disable


                // 접근제한 설정을 위한 필터
                .authorizeRequests()
                .antMatchers("/",
                        "/error",
                        "/favicon.ico",
                        "/**/*.png",
                        "/**/*.gif",
                        "/**/*.svg",
                        "/**/*.jpg",
                        "/**/*.html",
                        "/**/*.css",
                        "/**/*.js").permitAll()
                .anyRequest().permitAll()
                .and()


                // OAuth2 로그인을 위한 필터
                .oauth2Login()
                .authorizationEndpoint()
                .baseUri("/api/auth/oauth2/authorize")
                .authorizationRequestRepository(cookieOAuth2AuthorizationRequestRepository)
                .and()
                .redirectionEndpoint()
                .baseUri("/api/auth/oauth2/callback/*")
                .and()
                .userInfoEndpoint()
                .userService(customOAuth2UserService)
                .and()
                .successHandler(oAuth2AuthenticationSuccessHandler)
                .failureHandler(oAuth2AuthenticationFailureHandler);
        // redirectionEndpoint: 인증 서버가 응답을 반환하는 클라이언트의 URI에 대한 설정
        // userInfoEndPoint: 리소스 서버로부터 유저 정보를 가져올 때 사용되는 설정
        // successHandler: 인증 및 유저 정보를 가져오는 것까지 성공했을 때 호출되는 핸들러
        // failureHandler: 인증 또는 유저 정보를 가져오는 데 실패했을 때 호출되는 핸들러

        // Add our custom Token based authentication filter
        httpSecurity.addFilterBefore(tokenAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }
}