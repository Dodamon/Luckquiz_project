package com.luckquiz.quiz.api.service;

import com.luckquiz.quiz.db.repository.QuizGameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class QuizService {
    private final QuizGameRepository quizGameRepository;

//    @Transactional
//    public void choose4(FourRequest 4rq){
//
//    }
}
