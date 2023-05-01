package com.luckquiz.grade.api.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.luckquiz.grade.api.request.KafkaGradeRequest;
import com.luckquiz.grade.config.KafkaProducer;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/kafka")
public class GradeController {
	private final KafkaProducer producer;

	@PostMapping("/test")
	@ResponseBody
	public String sendMessage(@RequestBody KafkaGradeRequest message) throws JsonProcessingException {
		producer.sendMessage(message);
		return "success";
	}
}
