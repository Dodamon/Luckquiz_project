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
import com.luckquiz.grade.db.entity.GradeFinish;
import com.luckquiz.grade.db.entity.QuizStart;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Slf4j
public class KafkaProducer {

	private final KafkaTemplate<String, Object> kafkaTemplate;
	private final KafkaTemplate<String, Object> kafkaStringTemplate;

	public void rollbackFinish(QuizStart message) {
		ListenableFuture<SendResult<String, Object>> future = kafkaStringTemplate.send(Topic.sign_to_quiz.toString(), SignToQuizKey.rollback_finish.toString(), message);
		future.addCallback(new ListenableFutureCallback<SendResult<String, Object>>() {
			@Override
			public void onSuccess(SendResult<String, Object> result) {
				log.info(String.format("Produced event to topic %s: key = %-10s value = %s", Topic.sign_to_quiz.toString(), SignToQuizKey.rollback_finish.toString(), message));
			}
			@Override
			public void onFailure(Throwable ex) {
				ex.printStackTrace();
			}
		});
		kafkaStringTemplate.flush();
	}

	public void gradeStart(QuizStart message) {
		ListenableFuture<SendResult<String, Object >> future = kafkaStringTemplate.send(Topic.sign_to_quiz.toString(), SignToQuizKey.grade_start.toString(), message);
		future.addCallback(new ListenableFutureCallback<SendResult<String, Object>>() {
			@Override
			public void onSuccess(SendResult<String, Object> result) {
				log.info(String.format("Produced event to topic %s: key = %-10s value = %s", Topic.sign_to_quiz.toString(), SignToQuizKey.grade_start.toString(), message));
			}
			@Override
			public void onFailure(Throwable ex) {
				ex.printStackTrace();
			}
		});
		kafkaStringTemplate.flush();
	}

	public void gradeEnd(GradeFinish gradeFinish) {
		ListenableFuture<SendResult<String, Object >> future = kafkaStringTemplate.send(Topic.sign_to_quiz.toString(), SignToQuizKey.grade_end.toString(), gradeFinish);
		future.addCallback(new ListenableFutureCallback<SendResult<String, Object>>() {
			@Override
			public void onSuccess(SendResult<String, Object> result) {
				log.info(String.format("Produced event to topic %s: key = %-10s value = %s", Topic.sign_to_quiz.toString(), SignToQuizKey.grade_end.toString() , gradeFinish));
			}
			@Override
			public void onFailure(Throwable ex) {
				ex.printStackTrace();
			}
		});
		kafkaStringTemplate.flush();
	}

	public void gradeTest(KafkaGradeRequest kafkaGradeRequest) {
		ListenableFuture<SendResult<String, Object >> future = kafkaTemplate.send(Topic.grade.toString(),"grade", kafkaGradeRequest);
		future.addCallback(new ListenableFutureCallback<SendResult<String, Object>>() {
			@Override
			public void onSuccess(SendResult<String, Object> result) {
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
	public void rollback(QuizStart message) {
		ListenableFuture<SendResult<String, Object>> future = kafkaStringTemplate.send(Topic.sign_to_grade.toString(), SignToGradeKey.rollback.toString(), message);
		future.addCallback(new ListenableFutureCallback<SendResult<String, Object>>() {
			@Override
			public void onSuccess(SendResult<String, Object> result) {
				log.info(String.format("Produced event to topic %s: key = %-10s value = %s", Topic.sign_to_grade.toString(), SignToGradeKey.rollback.toString() , message));
			}
			@Override
			public void onFailure(Throwable ex) {
				ex.printStackTrace();
			}
		});
		kafkaStringTemplate.flush();
	}

	public void quizStart(QuizStart message) {
		ListenableFuture<SendResult<String, Object >> future = kafkaStringTemplate.send(Topic.sign_to_grade.toString(), SignToGradeKey.quiz_start.toString(), message);
		future.addCallback(new ListenableFutureCallback<SendResult<String, Object>>() {
			@Override
			public void onSuccess(SendResult<String, Object> result) {
				log.info(String.format("Produced event to topic %s: key = %-10s value = %s", Topic.sign_to_grade.toString(), SignToGradeKey.quiz_start.toString() , message));
			}
			@Override
			public void onFailure(Throwable ex) {
				ex.printStackTrace();
			}
		});
		kafkaStringTemplate.flush();
	}

	public void quizEnd(QuizStart message) {
		ListenableFuture<SendResult<String, Object >> future = kafkaStringTemplate.send(Topic.sign_to_grade.toString(), SignToGradeKey.quiz_end.toString(), message);
		future.addCallback(new ListenableFutureCallback<SendResult<String, Object>>() {
			@Override
			public void onSuccess(SendResult<String, Object> result) {
				log.info(String.format("Produced event to topic %s: key = %-10s value = %s", Topic.sign_to_grade.toString(), SignToGradeKey.quiz_end.toString() , message));
			}
			@Override
			public void onFailure(Throwable ex) {
				ex.printStackTrace();
			}
		});
		kafkaStringTemplate.flush();
	}

}
