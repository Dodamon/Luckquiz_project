package com.luckquiz.grade.config;



import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.hash.HashMapper;
import org.springframework.data.redis.hash.Jackson2HashMapper;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.GenericToStringSerializer;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.JdkSerializationRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.luckquiz.grade.db.entity.Grade;

@EnableRedisRepositories
@Configuration
public class RedisConfig {
	@Value("${spring.cache.redis.host}")
	private String redisHost;
	@Value("${spring.cache.redis.port}")
	private int redisPort;
	@Value("${spring.cache.redis.password}")
	private String redisPassword;
	@Bean
	public RedisConnectionFactory redisConnectionFactory(){
		RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration();
		redisStandaloneConfiguration.setPassword(redisPassword);
		redisStandaloneConfiguration.setHostName(redisHost);
		redisStandaloneConfiguration.setPort(redisPort);
		return new LettuceConnectionFactory(redisStandaloneConfiguration);
	}

	@Bean
	public RedisTemplate<String, Integer> redisTemplate(){
		RedisTemplate<String,Integer> redisTemplate = new RedisTemplate<>();
		redisTemplate.setConnectionFactory(redisConnectionFactory());
		redisTemplate.setKeySerializer(new StringRedisSerializer());
		redisTemplate.setValueSerializer(new GenericToStringSerializer<Integer>(Integer.class));
		redisTemplate.setHashValueSerializer(RedisSerializer.java());
		// redisTemplate.setHashValueSerializer(new Jackson2JsonRedisSerializer(Grading.class));
		// redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(String.class));
		return redisTemplate;
	}

	@Bean
	public RedisTemplate<String, Grade> redisGradeTemplate() {
		RedisTemplate<String,Grade> redisTemplate = new RedisTemplate<>();
		redisTemplate.setConnectionFactory(redisConnectionFactory());
		redisTemplate.setKeySerializer(RedisSerializer.string());
		redisTemplate.setHashKeySerializer(RedisSerializer.string());
		// redisTemplate.setHashValueSerializer(RedisSerializer.json());
		RedisSerializer<Grade> serializer = new Jackson2JsonRedisSerializer<>(Grade.class);
		redisTemplate.setHashValueSerializer(serializer);
		return redisTemplate;
	}


}
