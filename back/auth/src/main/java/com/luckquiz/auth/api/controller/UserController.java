package com.luckquiz.auth.api.controller;


import com.luckquiz.auth.api.service.UserService;
import com.luckquiz.auth.db.repository.TemplateRepository;
import com.luckquiz.auth.dto.response.UserResponse;
import com.luckquiz.auth.security.principal.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

@RequiredArgsConstructor
@RequestMapping("/api/auth/user")
@RestController
@Slf4j
public class UserController {

    private final UserService userService;

    private final TemplateRepository templateRepository;

    @GetMapping()
    public ResponseEntity test() {
        return ResponseEntity.ok().body("this is auth server test");
    }

//    @GetMapping("/info")
//    public ResponseEntity getUser(Authentication authentication) {
//        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
//        UUID id = userPrincipal.getId();
//        UserResponse userResponse = userService.getUserInfo(id);
//        return ResponseEntity.ok().body(userResponse);
//    }

    @GetMapping("/info")
    public ResponseEntity getUser(HttpServletRequest request) {
        String bearerToken = request.getHeader(HttpHeaders.AUTHORIZATION);
        log.info("access token :  " + bearerToken);
        String accessToken = getJwtFromRequest(request);
        UserResponse userResponse = userService.getUserInfoFromToken(accessToken);
        return ResponseEntity.ok(userResponse);
    }

    @GetMapping("/templates")
    public ResponseEntity getTemplates(HttpServletRequest request) {
        String accessToken = getJwtFromRequest(request);
        UserResponse userResponse = userService.getUserInfoFromToken(accessToken);
        return ResponseEntity.status(HttpStatus.OK).body(templateRepository.findAllByHostId(userResponse.getId()));
    }
    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }

}
