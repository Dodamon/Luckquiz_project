package com.luckquiz.grade.config;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;

import com.luckquiz.grade.api.common.enums.SignToGradeKey;
import com.luckquiz.grade.api.common.enums.Topic;
import com.luckquiz.grade.api.request.KafkaGradeRequest;
import com.luckquiz.grade.api.common.enums.SignToQuizKey;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Slf4j
public class KafkaProducer {

	private final KafkaTemplate<String, KafkaGradeRequest> kafkaTemplate;
	private final KafkaTemplate<String, String> kafkaStringTemplate;

	public void rollbackFinish(String roomId) {
		ListenableFuture<SendResult<String, String >> future = kafkaStringTemplate.send(Topic.sign_to_quiz.toString(), SignToQuizKey.rollback_finish.toString(), roomId);
		future.addCallback(new ListenableFutureCallback<SendResult<String, String>>() {
			@Override
			public void onSuccess(SendResult<String, String> result) {
				log.info(String.format("Produced event to topic %s: key = %-10s value = %s", Topic.sign_to_quiz.toString(), SignToQuizKey.rollback_finish.toString(), roomId));
			}
			@Override
			public void onFailure(Throwable ex) {
				ex.printStackTrace();
			}
		});
		kafkaStringTemplate.flush();
	}

	public void gradeStart(String roomId) {
		ListenableFuture<SendResult<String, String >> future = kafkaStringTemplate.send(Topic.sign_to_quiz.toString(), SignToQuizKey.grade_start.toString(), roomId);
		future.addCallback(new ListenableFutureCallback<SendResult<String, String>>() {
			@Override
			public void onSuccess(SendResult<String, String> result) {
				log.info(String.format("Produced event to topic %s: key = %-10s value = %s", Topic.sign_to_quiz.toString(), SignToQuizKey.grade_start.toString(), roomId));
			}
			@Override
			public void onFailure(Throwable ex) {
				ex.printStackTrace();
			}
		});
		kafkaStringTemplate.flush();
	}

	public void gradeEnd(String roomId) {
		ListenableFuture<SendResult<String, String >> future = kafkaStringTemplate.send(Topic.sign_to_quiz.toString(), SignToQuizKey.grade_end.toString(), roomId);
		future.addCallback(new ListenableFutureCallback<SendResult<String, String>>() {
			@Override
			public void onSuccess(SendResult<String, String> result) {
				log.info(String.format("Produced event to topic %s: key = %-10s value = %s", Topic.sign_to_quiz.toString(), SignToQuizKey.grade_end.toString() , roomId));
			}
			@Override
			public void onFailure(Throwable ex) {
				ex.printStackTrace();
			}
		});
		kafkaStringTemplate.flush();
	}

	public void gradeTest(KafkaGradeRequest kafkaGradeRequest) {
		ListenableFuture<SendResult<String, KafkaGradeRequest >> future = kafkaTemplate.send(Topic.grade.toString(),"grade", kafkaGradeRequest);
		future.addCallback(new ListenableFutureCallback<SendResult<String, KafkaGradeRequest>>() {
			@Override
			public void onSuccess(SendResult<String, KafkaGradeRequest> result) {
				log.info(String.format("Produced event to topic %s: key = %-10s value = %s", Topic.grade.toString(), "grade" , kafkaGradeRequest));
			}
			@Override
			public void onFailure(Throwable ex) {
				ex.printStackTrace();
			}
		});
		kafkaStringTemplate.flush();
	}


	//---------------------------------------------0-테스트
	public void rollback(String roomId) {
		ListenableFuture<SendResult<String, String >> future = kafkaStringTemplate.send(Topic.sign_to_grade.toString(), SignToGradeKey.rollback.toString(), roomId);
		future.addCallback(new ListenableFutureCallback<SendResult<String, String>>() {
			@Override
			public void onSuccess(SendResult<String, String> result) {
				log.info(String.format("Produced event to topic %s: key = %-10s value = %s", Topic.sign_to_grade.toString(), SignToGradeKey.rollback.toString() , roomId));
			}
			@Override
			public void onFailure(Throwable ex) {
				ex.printStackTrace();
			}
		});
		kafkaStringTemplate.flush();
	}

	public void quizStart(String roomId) {
		ListenableFuture<SendResult<String, String >> future = kafkaStringTemplate.send(Topic.sign_to_grade.toString(), SignToGradeKey.quiz_start.toString(), roomId);
		future.addCallback(new ListenableFutureCallback<SendResult<String, String>>() {
			@Override
			public void onSuccess(SendResult<String, String> result) {
				log.info(String.format("Produced event to topic %s: key = %-10s value = %s", Topic.sign_to_grade.toString(), SignToGradeKey.quiz_start.toString() , roomId));
			}
			@Override
			public void onFailure(Throwable ex) {
				ex.printStackTrace();
			}
		});
		kafkaStringTemplate.flush();
	}

	public void quizEnd(String roomId) {
		ListenableFuture<SendResult<String, String >> future = kafkaStringTemplate.send(Topic.sign_to_grade.toString(), SignToGradeKey.quiz_end.toString(), roomId);
		future.addCallback(new ListenableFutureCallback<SendResult<String, String>>() {
			@Override
			public void onSuccess(SendResult<String, String> result) {
				log.info(String.format("Produced event to topic %s: key = %-10s value = %s", Topic.sign_to_grade.toString(), SignToGradeKey.quiz_end.toString() , roomId));
			}
			@Override
			public void onFailure(Throwable ex) {
				ex.printStackTrace();
			}
		});
		kafkaStringTemplate.flush();
	}

}
