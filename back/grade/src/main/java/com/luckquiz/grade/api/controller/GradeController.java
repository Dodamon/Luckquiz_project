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
import com.luckquiz.grade.db.entity.GradeFinish;
import com.luckquiz.grade.db.entity.QuizStart;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/grade/kafka")
public class GradeController {
	private final KafkaProducer producer;
	private final GradeService gradeService;
	@PostMapping("/rollbackfinish")
	@ResponseBody
	public String rollbackFinish(@RequestBody QuizStart message) {
		producer.rollbackFinish(message);
		return "success";
	}

	@PostMapping("/gradestart")
	@ResponseBody
	public String gradeStart(@RequestBody QuizStart message) {
		producer.gradeStart(message);
		return "submit";
	}

	@PostMapping("/gradefinish")
	@ResponseBody
	public String gradeFinish(@RequestBody GradeFinish message) {
		producer.gradeEnd(message);
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
	public String rollback(@RequestBody QuizStart message) {
		producer.rollback(message);
		return "submit";
	}

	@PostMapping("/quizstart")
	@ResponseBody
	public String quizStart(@RequestBody QuizStart message) {
		producer.quizStart(message);
		return "quizStart";
	}

	@PostMapping("/quizend")
	@ResponseBody
	public String quizEnd(@RequestBody QuizStart message) {
		producer.quizEnd(message);
		return "quizStart";
	}

	@PostMapping("/enter")
	@ResponseBody
	public String enter(@RequestBody KafkaGradeRequest kafkaGradeRequest) {
		gradeService.enter(kafkaGradeRequest);
		return "quizStart";
	}

	@PostMapping("/gradeend")
	@ResponseBody
	public String gradeend(@RequestBody GradeFinish gradeFinish) {
		producer.gradeEnd(gradeFinish);
		return "quizStart";
	}
}

