package com.luckquiz.grade.api.controller;

import java.util.List;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Controller;

import com.google.gson.Gson;
import com.luckquiz.grade.api.common.enums.GradeKey;
import com.luckquiz.grade.api.common.enums.Topic;
import com.luckquiz.grade.api.request.KafkaEmotionRequest;
import com.luckquiz.grade.api.request.KafkaFinalEndRequest;
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

	@KafkaListener(topics = "grade" , groupId = "grade_group",properties = {},containerFactory = "kafkaListenerContainerFactory")
	public void gradingConsumer(List<String> messages, @Header(KafkaHeaders.RECEIVED_TOPIC) List<Topic> topics, @Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) List<String> keys) {
		System.out.println("grade 시작");
		for(int i=0; i<messages.size(); i++){
			System.out.println("key 값 :" + keys.get(i));
			switch (keys.get(i)){
				case "grade":
					System.out.println("grade 시작");
					KafkaGradeRequest gradeRequest = gson.fromJson(messages.get(i), KafkaGradeRequest.class);
					gradeService.grade(gradeRequest);
					break;
				case "emotion":
					System.out.println("이모션 시작");
					KafkaEmotionRequest kafkaEmotionRequest = gson.fromJson(messages.get(i), KafkaEmotionRequest.class);
					gradeService.pictureGrade(kafkaEmotionRequest);
					break;
				default:
					log.warn("grade 컨슈머에서 이상한 키값이 왔습니다.");
					break;
			}
		}
	}

	@KafkaListener(topics = "sign_to_grade", groupId = "grade_sign_group", properties = {})
	public void signHandleConsumer(String message, @Header(KafkaHeaders.RECEIVED_TOPIC) String topic, @Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) SignToGradeKey key) {
		// KafkaGradeRequest gradeRequest = gson.fromJson(message, KafkaGradeRequest.class)
		// ConsumerRecord record = (ConsumerRecord) message;
		switch(key){
			case rollback:
				KafkaQuizRollbackRequest quizRollbackRequest = gson.fromJson(message, KafkaQuizRollbackRequest.class);
				gradeService.rollback(quizRollbackRequest);
				break;
			case quiz_end:
				System.out.println("quiz_end 시작");
				System.out.println(message);
				KafkaQuizEndRequest quizEndRequest = gson.fromJson(message, KafkaQuizEndRequest.class);
				gradeService.quizEnd(quizEndRequest);
				break;
			case quiz_start:
				KafkaQuizStartRequest quizStartRequest = gson.fromJson(message, KafkaQuizStartRequest.class);
				gradeService.quizStart(quizStartRequest);
				break;
			case final_end:
				KafkaFinalEndRequest kafkaFinalEndRequest = gson.fromJson(message, KafkaFinalEndRequest.class);
				gradeService.finalFinish(kafkaFinalEndRequest);
				break;
			default:
				log.info("없는 키값입니다.");
				break;
		}
	}
}
