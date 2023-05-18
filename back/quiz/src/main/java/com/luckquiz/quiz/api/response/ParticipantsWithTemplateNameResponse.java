package com.luckquiz.quiz.api.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ParticipantsWithTemplateNameResponse {
	private String title;
	private List<QuizRoomGuest> list;
}
