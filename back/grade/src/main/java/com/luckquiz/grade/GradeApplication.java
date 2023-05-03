package com.luckquiz.grade;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GradeApplication {

	public static void main(String[] args) {

		// System.setProperty("spring.devtools.restart.enabled","false");
		SpringApplication.run(GradeApplication.class, args);
	}

}
