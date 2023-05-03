package com.luckquiz.grade.api.response;

import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TemplateDetailResponse {
	private int id;
	private String name;
	private UUID hostId;
	private List<TemplateInfoResponse> quizList;
	private String[] numbering;

}
