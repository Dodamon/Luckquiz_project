package com.luckquiz.grade.api.service;

import org.springframework.stereotype.Service;

import com.luckquiz.grade.config.KafkaProducer;
import com.luckquiz.grade.db.entity.GradeFinish;
import com.luckquiz.grade.db.entity.QuizStart;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SignToQuizService {
	private final KafkaProducer kafkaProducer;

	public void rollbackFinish(QuizStart message) {
		kafkaProducer.rollbackFinish(message);
	}

	public void gradeStart(QuizStart message) {
		kafkaProducer.gradeStart(message);
	}

	public void gradeEnd(GradeFinish gradeFinish) {
		kafkaProducer.gradeEnd(gradeFinish);
	}
}
