package com.luckquiz.quiz.api.controller;


import com.luckquiz.quiz.api.response.QuizReportGuest;
import com.luckquiz.quiz.api.response.QuizReportProblem;
import com.luckquiz.quiz.api.response.QuizReportResponse;
import com.luckquiz.quiz.api.service.QuizReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/quiz/report")
public class QuizReportController {

    private final QuizReportService quizReportService;
    @GetMapping("")
    public ResponseEntity<QuizReportResponse> getQuizReport(
            @RequestParam(value = "roomId", required = true) int roomId,
            @RequestParam(value = "id", required = false) int userId) {
        log.info("roomId : " + String.valueOf(roomId));
        log.info("userId : " +  String.valueOf(userId));
        QuizReportResponse quizReportResponse = quizReportService.getQuizReport(roomId);
        return ResponseEntity.ok().body(quizReportResponse);
    }


    @GetMapping("/questions")
    public ResponseEntity<Slice<QuizReportProblem>> getQuizReportDetail(
            @RequestParam(value = "roomId", required = true) int roomId,
            @RequestParam(value = "id", required = false) int userId) {
        log.info("roomId : " + String.valueOf(roomId));
        log.info("userId : " +  String.valueOf(userId));
        return ResponseEntity.ok().body(quizReportService.getQuizProblems(roomId));
    }

    @GetMapping("/participants")
    public ResponseEntity<Slice<QuizReportGuest>> getQuizReportParticipants(
            @RequestParam(value = "roomId", required = true) int roomId,
            @RequestParam(value = "idx", defaultValue = "0") int lastGuestId,
            @PageableDefault(size = 10, sort="score", direction = Sort.Direction.DESC) Pageable pageable) {
        log.info("roomId : " + String.valueOf(roomId));
        log.info("lastGuestId : " +  String.valueOf(lastGuestId));
        return ResponseEntity.ok().body(quizReportService.getQuizParticipants(roomId, lastGuestId, pageable));
    }
}
