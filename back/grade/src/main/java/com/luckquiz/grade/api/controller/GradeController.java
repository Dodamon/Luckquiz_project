package com.luckquiz.grade.api.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.gson.Gson;
import com.luckquiz.grade.api.request.KafkaGradeRequest;
import com.luckquiz.grade.api.request.KafkaQuizEndRequest;
import com.luckquiz.grade.api.request.KafkaQuizRollbackRequest;
import com.luckquiz.grade.api.request.KafkaQuizStartRequest;
import com.luckquiz.grade.api.response.KafkaGradeEndResponse;
import com.luckquiz.grade.api.response.KafkaGradeStartResponse;
import com.luckquiz.grade.api.response.KafkaRollbackFinishResponse;
import com.luckquiz.grade.api.service.GradeService;
import com.luckquiz.grade.config.KafkaProducer;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/grade/kafka")
public class GradeController {
	private final KafkaProducer producer;
	private final GradeService gradeService;
	private final Gson gson;
	@PostMapping("/rollbackfinish")
	@ResponseBody
	public String rollbackFinish(@RequestBody KafkaRollbackFinishResponse message) {
		producer.rollbackFinish(gson.toJson(message));
		return "success";
	}

	@PostMapping("/gradestart")
	@ResponseBody
	public String gradeStart(@RequestBody KafkaGradeStartResponse message) {
		producer.gradeStart(gson.toJson(message));
		return "submit";
	}

	@PostMapping("/gradefinish")
	@ResponseBody
	public String gradeFinish(@RequestBody KafkaGradeEndResponse message) {
		producer.gradeEnd(gson.toJson(message));
		return "submit";
	}

	@PostMapping("/fortest")
	@ResponseBody
	public String grade(@RequestBody KafkaGradeRequest message) {
		producer.gradeTest(gson.toJson(message));
		return "submit";
	}

	@PostMapping("/rollback")
	@ResponseBody
	public String rollback(@RequestBody KafkaQuizRollbackRequest message) {
		producer.rollback(gson.toJson(message));
		return "submit";
	}

	@PostMapping("/quizstart")
	@ResponseBody
	public String quizStart(@RequestBody KafkaQuizStartRequest message) {
		producer.quizStart(gson.toJson(message));
		return "quizStart";
	}

	@PostMapping("/quizend")
	@ResponseBody
	public String quizEnd(@RequestBody KafkaQuizEndRequest message) {
		producer.quizEnd(gson.toJson(message));
		return "quizStart";
	}

	// @PostMapping("/enter")
	// @ResponseBody
	// public String enter(@RequestBody KafkaGradeRequest message) {
	// 	gradeService.enter(gson.toJson(message));
	// 	return "quizStart";
	// }

	@PostMapping("/gradeend")
	@ResponseBody
	public String gradeend(@RequestBody KafkaGradeEndResponse message) {
		producer.gradeEnd(gson.toJson(message));
		return "quizStart";
	}
}

