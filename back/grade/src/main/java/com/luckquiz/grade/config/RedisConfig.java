package com.luckquiz.grade.config;



import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.JdkSerializationRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

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
	public RedisTemplate<byte[], byte[]> redisTemplate(){
		RedisTemplate<byte[],byte[]> redisTemplate = new RedisTemplate<>();
		redisTemplate.setConnectionFactory(redisConnectionFactory());
		redisTemplate.setKeySerializer(new StringRedisSerializer());
		// redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(String.class));
		return redisTemplate;
	}
}
