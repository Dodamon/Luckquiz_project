package com.luckquiz.grade.api.controller;

import java.util.HashMap;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.common.errors.SerializationException;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Controller;

import com.google.gson.Gson;
import com.luckquiz.grade.api.common.enums.Topic;
import com.luckquiz.grade.api.request.KafkaGradeRequest;
import com.luckquiz.grade.api.common.enums.SignToGradeKey;
import com.luckquiz.grade.api.service.GradeService;
import com.luckquiz.grade.db.entity.QuizStart;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequiredArgsConstructor
public class KafkaConsumerController {
	private final GradeService gradeService;
	private final Gson gson;

	@KafkaListener(topics = "grade" , groupId = "grade_group")
	public void gradingConsumer(String message, @Header(KafkaHeaders.RECEIVED_TOPIC) Topic topic, @Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) String key) {
		KafkaGradeRequest gradeRequest = gson.fromJson(message, KafkaGradeRequest.class);
		if(key.equals("grade")){
			gradeService.grade(gradeRequest);
		} else {
			System.out.println("값이 다릅니다.");
		}
	}

	@KafkaListener(topics = "sign_to_grade", groupId = "grade_sign_group", properties = {"spring.json.use.type.headers=false"})
	public void signHandleConsumer(String message, @Header(KafkaHeaders.RECEIVED_TOPIC) String topic, @Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) SignToGradeKey key) {
		// KafkaGradeRequest gradeRequest = gson.fromJson(message, KafkaGradeRequest.class)
		System.out.println("헬로");
		System.out.println(message);
		// ConsumerRecord record = (ConsumerRecord) message;
		// if("rollback".equals(record.key())){
		// 	System.out.println("같다 rollback과");
		// 	HashMap hashMap = (HashMap) record.value();
		// 	System.out.println(hashMap);
		// }
		switch(key){
			case rollback:
				gradeService.rollback(message);
				break;
			case quiz_end:
				gradeService.quizEnd(message);
				break;
			case quiz_start:
				gradeService.quizStart(message);
				break;
			default:
				break;
		}
	}

}
