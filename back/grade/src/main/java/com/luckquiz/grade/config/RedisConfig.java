package com.luckquiz.grade.config;



import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;


@EnableRedisRepositories
@Configuration

public class RedisConfig {
	@Value("${spring.cache.redis.host}")
	private String redisHost;
	@Value("${spring.cache.redis.port}")
	private int redisPort;
	@Bean
	public RedisConnectionFactory redisConnectionFactory(){
		return new LettuceConnectionFactory(redisHost , redisPort);
	}

	@Bean
	public RedisTemplate<byte[], byte[]> redisTemplate(){
		RedisTemplate<byte[],byte[]> redisTemplate = new RedisTemplate<>();
		System.out.println(redisPort);
		System.out.println("1111");
		redisTemplate.setConnectionFactory(redisConnectionFactory());
		// redisTemplate.setKeySerializer(new StringRedisSerializer());
		// redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(String.class));
		return redisTemplate;
	}
}
