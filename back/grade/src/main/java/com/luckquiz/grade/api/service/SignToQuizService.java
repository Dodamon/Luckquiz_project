package com.luckquiz.grade.api.service;

import org.springframework.stereotype.Service;

import com.luckquiz.grade.config.KafkaProducer;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SignToQuizService {
	private final KafkaProducer kafkaProducer;

	public void rollbackFinish(String roomId) {
		kafkaProducer.rollbackFinish(roomId);
	}

	public void gradeStart(String roomId) {
		kafkaProducer.gradeStart(roomId);
	}

	public void gradeEnd(String roomId) {
		kafkaProducer.gradeEnd(roomId);
	}
}
