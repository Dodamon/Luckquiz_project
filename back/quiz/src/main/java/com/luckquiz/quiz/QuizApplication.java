package com.luckquiz.quiz;

import com.luckquiz.quiz.api.service.RedisTransService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.KafkaListener;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.UUID;

@SpringBootApplication
@Slf4j
@RequiredArgsConstructor
public class QuizApplication {
	public static void main(String[] args) {
		SpringApplication.run(QuizApplication.class, args);
	}

}
