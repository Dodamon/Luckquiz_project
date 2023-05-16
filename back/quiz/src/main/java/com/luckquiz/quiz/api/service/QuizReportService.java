package com.luckquiz.quiz.api.service;

import com.luckquiz.quiz.api.response.QuizReportGuest;
import com.luckquiz.quiz.api.response.QuizReportProblem;
import com.luckquiz.quiz.api.response.QuizReportResponse;
import com.luckquiz.quiz.common.exception.CustomException;
import com.luckquiz.quiz.common.exception.CustomExceptionType;
import com.luckquiz.quiz.db.entity.QuizReport;
import com.luckquiz.quiz.db.entity.QuizRoom;
import com.luckquiz.quiz.db.repository.QuizReportCustomRepository;
import com.luckquiz.quiz.db.repository.QuizReportRepository;
import com.luckquiz.quiz.db.repository.QuizRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.Instant;
import java.time.ZoneOffset;

@Service
@RequiredArgsConstructor
@Slf4j
public class QuizReportService {
    private final QuizReportRepository quizReportRepository;
    private final QuizRoomRepository quizRoomRepository;
    private final QuizReportCustomRepository quizReportCustomRepository;

    @Transactional(readOnly = true)
    public QuizReportResponse getQuizReport(int roomId) {

        QuizRoom quizRoom = quizRoomRepository.findById(roomId).orElseThrow(
                () -> new CustomException(CustomExceptionType.QUIZ_NOT_FOUND));

        // LocalDateTime 객체를 Instant 객체로 변환
        Instant startInstant = quizRoom.getCreatedTime().toInstant(ZoneOffset.UTC);
        Instant endInstant = quizRoom.getFinishedTime().toInstant(ZoneOffset.UTC);
        // Instant 객체 간의 차이를 Duration 객체로 계산
        Duration duration = Duration.between(startInstant, endInstant);

        QuizReportResponse quizReportResponse = QuizReportResponse.builder()
                .quizCount(quizRoom.getQuizCount())
                .gameCount(quizRoom.getGameCount())
                .participantCount(quizRoom.getParticipantCount())
                .successRate(quizRoom.getCorrectCount() / quizRoom.getSubmitCount())
                .duration(duration)
                .title(quizRoom.getTemplate().getName())
                .build();

        log.info(quizReportResponse.toString());
        return quizReportResponse;
    }

    @Transactional(readOnly = true)
    public Slice<QuizReportGuest> getQuizParticipants(int roomId, int lastGuestId, Pageable pageable) {
        QuizRoom quizRoom = quizRoomRepository.findById(roomId).orElseThrow(
                () -> new CustomException(CustomExceptionType.QUIZ_NOT_FOUND));
        return quizReportCustomRepository.getParticipants(quizRoom.getPinNum(), lastGuestId, pageable);
    }

    @Transactional(readOnly = true)
    public Slice<QuizReportProblem> getQuizProblems(int roomId) {
        QuizRoom quizRoom = quizRoomRepository.findById(roomId).orElseThrow(
                () -> new CustomException(CustomExceptionType.QUIZ_NOT_FOUND));
        return quizReportCustomRepository.getProblems(roomId, quizRoom.getTemplate().getId());
    }
}
