package com.luckquiz.grade.api.controller;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Controller;

import com.luckquiz.grade.api.common.enums.Topic;
import com.luckquiz.grade.api.request.KafkaGradeRequest;
import com.luckquiz.grade.api.common.enums.SignToGradeKey;
import com.luckquiz.grade.api.service.GradeService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequiredArgsConstructor
public class KafkaConsumerController {
	private final GradeService gradeService;

	@KafkaListener(topics = "grade" , groupId = "grade_group")
	public void gradingConsumer(KafkaGradeRequest message, @Header(KafkaHeaders.RECEIVED_TOPIC) Topic topic, @Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) String key) {
		// KafkaGradeRequest gradeRequest = gson.fromJson(message, KafkaGradeRequest.class);
		if(key.equals("grade")){
			gradeService.grade(message);
		} else {
			System.out.println("값이 다릅니다.");
		}
	}

	@KafkaListener(topics = "sign_to_grade", groupId = "grade_sign_group")
	public void signHandleConsumer(String roomId, @Header(KafkaHeaders.RECEIVED_TOPIC) String topic, @Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) SignToGradeKey key) {
		// KafkaGradeRequest gradeRequest = gson.fromJson(message, KafkaGradeRequest.class);
		System.out.println("헬로");
		switch(key){
			case rollback:
				gradeService.rollback(roomId);
				break;
			case quiz_end:
				gradeService.quizEnd(roomId);
				break;
			case quiz_start:
				gradeService.quizStart(roomId);
				break;
			default:
				break;
		}
	}

}
