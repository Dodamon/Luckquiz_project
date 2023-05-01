package com.luckquiz.grade.config;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.gson.Gson;
import com.luckquiz.grade.api.request.KafkaGradeRequest;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class KafkaProducer {
	private static final String TOPIC = "test";
	private final KafkaTemplate<String, String> kafkaTemplate;
	private final Gson gson;
	public void sendMessage(KafkaGradeRequest message) throws JsonProcessingException {

		System.out.println(String.format("Produce message : %s", message));

		//String으로 직렬화
		this.kafkaTemplate.send(TOPIC, gson.toJson(message));
	}
}
