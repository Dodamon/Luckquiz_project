package com.luckquiz.auth.api.controller;

import com.luckquiz.auth.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/test")
@RestController
public class TestController {

    private final UserService userService;

    @GetMapping()
    public ResponseEntity test() {
        return ResponseEntity.ok().body("this is auth server test");
    }
}