package com.luckquiz.grade.db.entity;

import java.io.Serializable;

import org.springframework.data.redis.core.RedisHash;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Grade {
	private String playerName;
	private int score_get;
	private int rank_pre;
	private int rank_now;

}
