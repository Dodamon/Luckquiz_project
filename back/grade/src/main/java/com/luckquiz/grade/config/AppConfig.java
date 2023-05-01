package com.luckquiz.grade.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

@Configuration
public class AppConfig {
	@Bean
	public Gson gson() {
		return new Gson();
	}

}
