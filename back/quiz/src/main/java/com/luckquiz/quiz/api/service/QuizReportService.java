package com.luckquiz.quiz.api.service;

import com.luckquiz.quiz.api.response.QuizRoomGuest;
import com.luckquiz.quiz.api.response.QuizRoomQuestion;
import com.luckquiz.quiz.api.response.QuizRoomResponse;
import com.luckquiz.quiz.api.response.QuizRoomListResponse;
import com.luckquiz.quiz.common.exception.CustomException;
import com.luckquiz.quiz.common.exception.CustomExceptionType;
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
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class QuizReportService {
    private final QuizReportRepository quizReportRepository;
    private final QuizRoomRepository quizRoomRepository;
    private final QuizReportCustomRepository quizReportCustomRepository;

    @Transactional(readOnly = true)
    public Slice<QuizRoomListResponse> getQuizRoomList(UUID userId) {
        return quizReportCustomRepository.getQuizRoomList(userId);
    }
    @Transactional(readOnly = true)
    public QuizRoomResponse getQuizRoomInfo(int roomId) {
        // quizRoom 전체 방에 대한 정보
        // quizReport는 문제 하나에 대한 정보
        QuizRoom quizRoom = quizRoomRepository.findById(roomId).orElseThrow(
                () -> new CustomException(CustomExceptionType.QUIZ_NOT_FOUND));

        // LocalDateTime 객체를 Instant 객체로 변환
        Instant startInstant = quizRoom.getCreatedTime().toInstant(ZoneOffset.UTC);
        Instant endInstant = quizRoom.getFinishedTime().toInstant(ZoneOffset.UTC);
        // Instant 객체 간의 차이를 Duration 객체로 계산
        Duration duration = Duration.between(startInstant, endInstant);

        QuizRoomResponse quizReportResponse = null;
        if(quizRoom.getSubmitCount() == 0) {
            quizReportResponse = QuizRoomResponse.builder()
                    .quizCount(quizRoom.getQuizCount())
                    .gameCount(quizRoom.getGameCount())
                    .participantCount(quizRoom.getParticipantCount())
                    .successRate(0.0)
                    .duration(duration)
                    .title(quizRoom.getTemplateName())
                    .build();

        } else {
            quizReportResponse = QuizRoomResponse.builder()
                    .quizCount(quizRoom.getQuizCount())
                    .gameCount(quizRoom.getGameCount())
                    .participantCount(quizRoom.getParticipantCount())
                    .successRate(quizRoom.getCorrectCount() / (quizRoom.getSubmitCount() * 1.0))
                    .duration(duration)
                    .title(quizRoom.getTemplateName())
                    .build();
        }
        log.info(quizReportResponse.toString());
        return quizReportResponse;
    }

    // 퀴즈룸에 참여한 참여자들의 정보를 가져옵니다.
    // quiz_guest
    @Transactional(readOnly = true)
    public Slice<QuizRoomGuest> getQuizRoomParticipants(int roomId, int lastGuestId, Pageable pageable) {
        return quizReportCustomRepository.getParticipants(roomId, lastGuestId, pageable);
    }

    @Transactional(readOnly = true)
    public Slice<QuizRoomQuestion> getQuizQuestions(int roomId) {
        return quizReportCustomRepository.getQuestions(roomId);
    }
}
