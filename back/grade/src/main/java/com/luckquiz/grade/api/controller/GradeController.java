package com.luckquiz.grade.api.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.luckquiz.grade.api.request.KafkaGradeRequest;
import com.luckquiz.grade.api.service.GradeService;
import com.luckquiz.grade.config.KafkaProducer;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/grade/kafka")
public class GradeController {
	private final KafkaProducer producer;
	private final GradeService gradeService;
	@PostMapping("/rollbackfinish")
	@ResponseBody
	public String rollbackFinish(@RequestBody String roomId) {
		producer.rollbackFinish(roomId);
		return "success";
	}

	@PostMapping("/gradestart")
	@ResponseBody
	public String gradeStart(@RequestBody String roomId) {
		producer.gradeStart(roomId);
		return "submit";
	}

	@PostMapping("/gradefinish")
	@ResponseBody
	public String gradeFinish(@RequestBody String roomId) {
		producer.gradeEnd(roomId);
		return "submit";
	}

	@PostMapping("/fortest")
	@ResponseBody
	public String grade(@RequestBody KafkaGradeRequest kafkaGradeRequest) {
		producer.gradeTest(kafkaGradeRequest);
		return "submit";
	}

	@PostMapping("/rollback")
	@ResponseBody
	public String rollback(@RequestBody String roomId) {
		producer.rollback(roomId);
		return "submit";
	}

	@PostMapping("/quizstart")
	@ResponseBody
	public String quizStart(@RequestBody String roomId) {
		producer.quizStart(roomId);
		return "quizStart";
	}

	@PostMapping("/quizend")
	@ResponseBody
	public String quizEnd(@RequestBody String roomId) {
		producer.quizEnd(roomId);
		return "quizStart";
	}

	@PostMapping("/enter")
	@ResponseBody
	public String enter(@RequestBody KafkaGradeRequest kafkaGradeRequest) {
		gradeService.enter(kafkaGradeRequest);
		return "quizStart";
	}
}

