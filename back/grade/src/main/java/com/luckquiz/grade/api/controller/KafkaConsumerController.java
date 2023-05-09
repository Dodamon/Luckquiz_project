package com.luckquiz.grade.api.controller;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Controller;

import com.google.gson.Gson;
import com.luckquiz.grade.api.common.enums.Topic;
import com.luckquiz.grade.api.request.KafkaGradeRequest;
import com.luckquiz.grade.api.common.enums.SignToGradeKey;
import com.luckquiz.grade.api.request.KafkaQuizEndRequest;
import com.luckquiz.grade.api.request.KafkaQuizRollbackRequest;
import com.luckquiz.grade.api.request.KafkaQuizStartRequest;
import com.luckquiz.grade.api.service.GradeService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequiredArgsConstructor
public class KafkaConsumerController {
	private final GradeService gradeService;
	private final Gson gson;

	@KafkaListener(topics = "grade" , groupId = "grade_group", properties = {})
	public void gradingConsumer(String message, @Header(KafkaHeaders.RECEIVED_TOPIC) Topic topic, @Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) String key) {
		KafkaGradeRequest gradeRequest = gson.fromJson(message, KafkaGradeRequest.class);
		if(key.equals("grade")){
			System.out.println("채점하기");
			gradeService.grade(gradeRequest);
		} else {
			System.out.println("값이 다릅니다.");
		}
	}

	@KafkaListener(topics = "sign_to_grade", groupId = "grade_sign_group", properties = {})
	public void signHandleConsumer(String message, @Header(KafkaHeaders.RECEIVED_TOPIC) String topic, @Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) SignToGradeKey key) {
		// KafkaGradeRequest gradeRequest = gson.fromJson(message, KafkaGradeRequest.class)
		// ConsumerRecord record = (ConsumerRecord) message;
		// if("rollback".equals(record.key())){
		// 	System.out.println("같다 rollback과");
		// 	HashMap hashMap = (HashMap) record.value();
		// 	System.out.println(hashMap);
		// }
		switch(key){
			case rollback:
				KafkaQuizRollbackRequest quizRollbackRequest = gson.fromJson(message, KafkaQuizRollbackRequest.class);
				gradeService.rollback(quizRollbackRequest);
				break;
			case quiz_end:
				KafkaQuizEndRequest quizEndRequest = gson.fromJson(message, KafkaQuizEndRequest.class);
				gradeService.quizEnd(quizEndRequest);
				break;
			case quiz_start:
				KafkaQuizStartRequest quizStartRequest = gson.fromJson(message, KafkaQuizStartRequest.class);
				gradeService.quizStart(quizStartRequest);
				break;
			default:
				log.info("없는 키값입니다.");
				break;
		}
	}

}
