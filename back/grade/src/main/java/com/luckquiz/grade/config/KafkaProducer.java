package com.luckquiz.grade.config;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;

import com.luckquiz.grade.api.common.enums.SignToGradeKey;
import com.luckquiz.grade.api.common.enums.Topic;
import com.luckquiz.grade.api.common.enums.SignToQuizKey;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Slf4j
public class KafkaProducer {

	private final KafkaTemplate<String, String> kafkaTemplate;

	public void rollbackFinish(String message) {

		ListenableFuture<SendResult<String, String>> future = kafkaTemplate.send(Topic.sign_to_quiz.toString(), SignToQuizKey.rollback_finish.toString(), message);
		future.addCallback(new ListenableFutureCallback<SendResult<String, String>>() {
			@Override
			public void onSuccess(SendResult<String, String> result) {
				log.info(String.format("Produced event to topic %s: key = %-10s value = %s", Topic.sign_to_quiz.toString(), SignToQuizKey.rollback_finish.toString(), message));
			}
			@Override
			public void onFailure(Throwable ex) {
				ex.printStackTrace();
			}
		});
		kafkaTemplate.flush();
	}

	public void gradeStart(String message) {
		ListenableFuture<SendResult<String, String >> future = kafkaTemplate.send(Topic.sign_to_quiz.toString(), SignToQuizKey.grade_start.toString(), message);
		future.addCallback(new ListenableFutureCallback<SendResult<String, String>>() {
			@Override
			public void onSuccess(SendResult<String, String> result) {
				log.info(String.format("Produced event to topic %s: key = %-10s value = %s", Topic.sign_to_quiz.toString(), SignToQuizKey.grade_start.toString(), message));
			}
			@Override
			public void onFailure(Throwable ex) {
				ex.printStackTrace();
			}
		});
		kafkaTemplate.flush();
	}

	public void gradeEnd(String gradeFinish) {
		ListenableFuture<SendResult<String, String >> future = kafkaTemplate.send(Topic.sign_to_quiz.toString(), SignToQuizKey.grade_end.toString(), gradeFinish);
		future.addCallback(new ListenableFutureCallback<SendResult<String, String>>() {
			@Override
			public void onSuccess(SendResult<String, String> result) {
				log.info(String.format("Produced event to topic %s: key = %-10s value = %s", Topic.sign_to_quiz.toString(), SignToQuizKey.grade_end.toString() , gradeFinish));
			}
			@Override
			public void onFailure(Throwable ex) {
				ex.printStackTrace();
			}
		});
		kafkaTemplate.flush();
	}

	public void gradeTest(String kafkaGradeRequest) {
		ListenableFuture<SendResult<String, String >> future = kafkaTemplate.send(Topic.grade.toString(),"grade", kafkaGradeRequest);
		future.addCallback(new ListenableFutureCallback<SendResult<String, String>>() {
			@Override
			public void onSuccess(SendResult<String, String> result) {
				log.info(String.format("Produced event to topic %s: key = %-10s value = %s", Topic.grade.toString(), "grade" , kafkaGradeRequest));
			}
			@Override
			public void onFailure(Throwable ex) {
				ex.printStackTrace();
			}
		});
		kafkaTemplate.flush();
	}


	//---------------------------------------------0-테스트
	public void rollback(String message) {
		ListenableFuture<SendResult<String, String>> future = kafkaTemplate.send(Topic.sign_to_grade.toString(), SignToGradeKey.rollback.toString(), message);
		future.addCallback(new ListenableFutureCallback<SendResult<String, String>>() {
			@Override
			public void onSuccess(SendResult<String, String> result) {
				log.info(String.format("Produced event to topic %s: key = %-10s value = %s", Topic.sign_to_grade.toString(), SignToGradeKey.rollback.toString() , message));
			}
			@Override
			public void onFailure(Throwable ex) {
				ex.printStackTrace();
			}
		});
		kafkaTemplate.flush();
	}

	public void quizStart(String message) {
		ListenableFuture<SendResult<String, String >> future = kafkaTemplate.send(Topic.sign_to_grade.toString(), SignToGradeKey.quiz_start.toString(), message);
		future.addCallback(new ListenableFutureCallback<SendResult<String, String>>() {
			@Override
			public void onSuccess(SendResult<String, String> result) {
				log.info(String.format("Produced event to topic %s: key = %-10s value = %s", Topic.sign_to_grade.toString(), SignToGradeKey.quiz_start.toString() , message));
			}
			@Override
			public void onFailure(Throwable ex) {
				ex.printStackTrace();
			}
		});
		kafkaTemplate.flush();
	}

	public void quizEnd(String message) {
		ListenableFuture<SendResult<String, String >> future = kafkaTemplate.send(Topic.sign_to_grade.toString(), SignToGradeKey.quiz_end.toString(), message);
		future.addCallback(new ListenableFutureCallback<SendResult<String, String>>() {
			@Override
			public void onSuccess(SendResult<String, String> result) {
				log.info(String.format("Produced event to topic %s: key = %-10s value = %s", Topic.sign_to_grade.toString(), SignToGradeKey.quiz_end.toString() , message));
			}
			@Override
			public void onFailure(Throwable ex) {
				ex.printStackTrace();
			}
		});
		kafkaTemplate.flush();
	}

}
