package com.luckquiz.quiz.api.service;

import com.google.gson.Gson;
import com.luckquiz.quiz.config.RedisConfig;
import com.luckquiz.quiz.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FinalEndService {
    private final Gson gson;
    private final RedisTransService redisTransService;
    private final StringRedisTemplate stringRedisTemplate;
    private final RedisConfig redisConfig;
    private final TemplateRepository templateRepository;
    private final QuizRoomRepository quizRoomRepository;
    private final QuizReportRepository quizReportRepository;

    private final QuizGuestRepository quizGuestRepository;
    private final UserRepository userRepository;

    @Transactional
    public void finalMariaAdd(){

    }

}
