package com.luckquiz.grade.config;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;

import com.luckquiz.grade.api.request.KafkaGradeRequest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Slf4j
public class KafkaProducer {
	private static final String TOPIC = "test_2";
	private final KafkaTemplate<String, KafkaGradeRequest> kafkaTemplate;
	public void sendMessage(KafkaGradeRequest message) {

		ListenableFuture<SendResult<String, KafkaGradeRequest >> future = kafkaTemplate.send(TOPIC, "key1", message);
		future.addCallback(new ListenableFutureCallback<SendResult<String, KafkaGradeRequest>>() {
			@Override
			public void onSuccess(SendResult<String, KafkaGradeRequest> result) {
				log.info(String.format("Produced event to topic %s: key = %-10s value = %s", TOPIC, "key1", message));
			}
			@Override
			public void onFailure(Throwable ex) {
				ex.printStackTrace();
			}
		});
		kafkaTemplate.flush();
	}
}
