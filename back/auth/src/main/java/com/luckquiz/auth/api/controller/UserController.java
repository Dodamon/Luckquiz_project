package com.luckquiz.auth.api.controller;


import com.luckquiz.auth.api.service.UserService;
import com.luckquiz.auth.db.repository.TemplateRepository;
import com.luckquiz.auth.dto.response.UserResponse;
import com.luckquiz.auth.security.principal.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RequiredArgsConstructor
@RequestMapping("/api/auth/user")
@RestController
public class UserController {

    private final UserService userService;

    private final TemplateRepository templateRepository;

    @GetMapping()
    public ResponseEntity test() {
        return ResponseEntity.ok().body("this is auth server test");
    }

    @GetMapping("/info")
    public ResponseEntity getUser(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        UUID id = userPrincipal.getId();
        UserResponse userResponse = userService.getUserInfo(id);
        return ResponseEntity.ok().body(userResponse);
    }

    @GetMapping("/templates")
    public ResponseEntity getTemplates(Authentication authentication){
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        UUID id = userPrincipal.getId();
        UserResponse userResponse = userService.getUserInfo(id);

        return ResponseEntity.status(HttpStatus.OK).body(templateRepository.findAllByHostId(userResponse.getId()));
    }

}
