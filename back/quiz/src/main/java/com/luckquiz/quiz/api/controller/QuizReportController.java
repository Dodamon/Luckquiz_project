package com.luckquiz.quiz.api.controller;


import com.luckquiz.quiz.api.response.QuizRoomGuest;
import com.luckquiz.quiz.api.response.QuizRoomQuestion;
import com.luckquiz.quiz.api.response.QuizRoomResponse;
import com.luckquiz.quiz.api.response.QuizRoomListResponse;
import com.luckquiz.quiz.api.service.QuizReportService;
import com.luckquiz.quiz.api.service.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/quiz/report")
public class QuizReportController {

    private final QuizReportService quizReportService;
    private final TokenProvider tokenProvider;

    // 유저가 열었던 모든 quiz room 정보를 가져옵니다
    @GetMapping("")
    public ResponseEntity<Slice<QuizRoomListResponse>> getQuizRoomList(HttpServletRequest request) {
        String accessToken = getJwtFromRequest(request);
        UUID hostId = tokenProvider.getUserIdFromToken(accessToken);
        log.info("access token :  " + accessToken);
        log.info("토큰 까기 성공 : 유저의 리포트 리스트를 가져옵니다");;
        return ResponseEntity.ok().body(quizReportService.getQuizRoomList(hostId));
    }

    // 퀴즈룸 하나의 기본 정보를 가져옵니다
    @GetMapping("/info")
    public ResponseEntity<QuizRoomResponse> getQuizRoomInfo(
            @RequestParam(value = "id", required = true) int roomId) {
        log.info("roomId : " + String.valueOf(roomId));
        QuizRoomResponse quizReportResponse = quizReportService.getQuizRoomInfo(roomId);
        return ResponseEntity.ok().body(quizReportResponse);
    }

    // 퀴즈룸의 참여자 정보를 가져온다
    @GetMapping("/participants")
    public ResponseEntity<Slice<QuizRoomGuest>> getQuizRoomParticipants(
            @RequestParam(value = "id", required = true) int roomId,
            @RequestParam(value = "next", defaultValue = "0") int lastGuestId,
            @PageableDefault(size = 10, sort="score", direction = Sort.Direction.DESC) Pageable pageable) {
        log.info("roomId : " + String.valueOf(roomId));
        log.info("lastGuestId : " +  String.valueOf(lastGuestId));
        return ResponseEntity.ok().body(quizReportService.getQuizRoomParticipants(roomId, lastGuestId, pageable));
    }

    // 퀴즈룸의 모든 문제들의 정보를 가져온다
    @GetMapping("/questions")
    public ResponseEntity<Slice<QuizRoomQuestion>> getQuizRoomQuestions(
            @RequestParam(value = "id", required = true) int roomId) {
        log.info("roomId : " + String.valueOf(roomId));
        return ResponseEntity.ok().body(quizReportService.getQuizQuestions(roomId));
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        log.info(bearerToken);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }

}
