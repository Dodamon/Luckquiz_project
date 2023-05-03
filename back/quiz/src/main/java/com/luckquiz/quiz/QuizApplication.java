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
	private final RedisTransService redisTransService;

	public static void main(String[] args) {
		SpringApplication.run(QuizApplication.class, args);
	}

	@KafkaListener(topics = "server_message",groupId = "test")
	public void messageListener(String in) throws Exception{
		UUID hostId = UUID.fromString(in.split(" ")[0]);
		int roomId = Integer.parseInt(in.split(" ")[1]);
		int templateId = Integer.parseInt(in.split(" ")[2]);
		System.out.println("hostId"+hostId + " and  roomId" + roomId);
		redisTransService.quizRedisTrans(roomId,hostId,templateId);  // roomId 로
		redisTransService.roomTempTrans(roomId,hostId,templateId);
		log.info("kafka : "+in);
	}
}
