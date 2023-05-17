package com.luckquiz.quiz.api.controller;


import com.luckquiz.quiz.api.response.QuizReportGuest;
import com.luckquiz.quiz.api.response.QuizReportListResponse;
import com.luckquiz.quiz.api.response.QuizReportProblem;
import com.luckquiz.quiz.api.response.QuizReportResponse;
import com.luckquiz.quiz.api.service.QuizReportService;
import com.luckquiz.quiz.api.service.TokenProvider;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
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

    @GetMapping("/")
    public ResponseEntity<Slice<QuizReportListResponse>> getQuizReportList(HttpServletRequest request) {
        String bearerToken = request.getHeader(HttpHeaders.AUTHORIZATION);
        log.info("access token :  " + bearerToken);
        String accessToken = getJwtFromRequest(request);
        UUID userId = tokenProvider.getUserIdFromToken(accessToken);
        log.info("토큰 까기 성공 : 유저의 리포트 리스트를 가져옵니다");;
        return ResponseEntity.ok().body(quizReportService.getQuizReportList(userId));
    }
    @GetMapping("/info")
    public ResponseEntity<QuizReportResponse> getQuizReport(
            @RequestParam(value = "report", required = true) int reportId,
            @RequestParam(value = "id", required = false) int userId) {
        log.info("reportId : " + String.valueOf(reportId));
        log.info("userId : " +  String.valueOf(userId));
        QuizReportResponse quizReportResponse = quizReportService.getQuizReport(reportId);
        return ResponseEntity.ok().body(quizReportResponse);
    }


    @GetMapping("/questions")
    public ResponseEntity<Slice<QuizReportProblem>> getQuizReportDetail(
            @RequestParam(value = "report", required = true) int reportId,
            @RequestParam(value = "id", required = false) int userId) {
        log.info("reportId : " + String.valueOf(reportId));
        log.info("userId : " +  String.valueOf(userId));
        return ResponseEntity.ok().body(quizReportService.getQuizProblems(reportId));
    }

    @GetMapping("/participants")
    public ResponseEntity<Slice<QuizReportGuest>> getQuizReportParticipants(
            @RequestParam(value = "report", required = true) int reportId,
            @RequestParam(value = "idx", defaultValue = "0") int lastGuestId,
            @PageableDefault(size = 10, sort="score", direction = Sort.Direction.DESC) Pageable pageable) {
        log.info("reportId : " + String.valueOf(reportId));
        log.info("lastGuestId : " +  String.valueOf(lastGuestId));
        return ResponseEntity.ok().body(quizReportService.getQuizParticipants(reportId, lastGuestId, pageable));
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }

}
