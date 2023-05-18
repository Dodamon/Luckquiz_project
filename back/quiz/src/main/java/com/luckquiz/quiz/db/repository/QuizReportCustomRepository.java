package com.luckquiz.quiz.db.repository;

import com.luckquiz.quiz.api.response.QuizRoomGuest;
import com.luckquiz.quiz.api.response.QuizRoomQuestion;
import com.luckquiz.quiz.api.response.QuizRoomListResponse;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.UUID;

import static com.luckquiz.quiz.db.entity.QQuizGuest.quizGuest;
import static com.luckquiz.quiz.db.entity.QQuizReport.quizReport;
import static com.luckquiz.quiz.db.entity.QQuizRoom.quizRoom;

@Repository
@Slf4j
public class QuizReportCustomRepository {
    private final QuizReportRepository quizReportRepository;
    private final QuizRoomRepository quizRoomRepository;
    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    public QuizReportCustomRepository(EntityManager em,
                                      QuizRoomRepository quizRoomRepository,
                                      QuizReportRepository quizReportRepository)
    {
        this.em = em;
        this.queryFactory = new JPAQueryFactory(em);
        this.quizRoomRepository = quizRoomRepository;
        this.quizReportRepository = quizReportRepository;
    }

    private BooleanExpression ltQuizGuestId(int guestId) {
        if(guestId == 0) {
            return quizGuest.id.lt(Integer.MAX_VALUE);
        }
        return quizGuest.id.lt(guestId);
    }

    // 무한 스크롤 방식 처리하는 메서드
    private Slice<QuizRoomGuest> checkLastPage(Pageable pageable, List<QuizRoomGuest> results) {
        boolean hasNext = false;
        // 조회한 결과 개수가 요청한 페이지 사이즈보다 크면 뒤에 더 있음, next = true
        if (results.size() > pageable.getPageSize()) {
            hasNext = true;
            results.remove(pageable.getPageSize());
        }
        return new SliceImpl<>(results, pageable, hasNext);
    }

    public Slice<QuizRoomListResponse> getQuizRoomList(UUID userId) {
        List<QuizRoomListResponse> results = queryFactory.select(
                        Projections.constructor( QuizRoomListResponse.class,
                                quizRoom.id,
                                quizRoom.templateName,
                                quizRoom.createdTime,
                                quizRoom.participantCount))
                .from(quizRoom)
                .where(
                        quizRoom.hostId.eq(userId),
                        quizRoom.finishedTime.isNotNull()
                        )
                .orderBy(quizRoom.id.desc())
                .fetch();
        return new SliceImpl<>(results);
    }

//    public List<QuizRoomListResponse> getQuizRoomList(UUID userId) {
//        List<QuizRoomListResponse> results = queryFactory.select(
//                        Projections.constructor( QuizRoomListResponse.class,
//                                quizRoom.id,
//                                quizRoom.templateName,
//                                quizRoom.createdTime,
//                                quizRoom.participantCount))
//                .from(quizRoom)
//                .where(
//                        quizRoom.hostId.eq(userId),
//                        quizRoom.finishedTime.isNotNull()
//                )
//                .orderBy(quizRoom.id.desc())
//                .fetch();
//        return results;
//    }


    public Slice<QuizRoomGuest> getParticipants(int roomId, int lastGuestId, Pageable pageable) {
        List<QuizRoomGuest> results = queryFactory.select(
                Projections.constructor( QuizRoomGuest.class,
                        quizGuest.id,
                        quizGuest.guestNickname,
                        quizGuest.correctCount.divide(quizGuest.totalCount).longValue(),
                        quizGuest.score.intValue())
                )
                .from(quizGuest)
                .where(
                        ltQuizGuestId(lastGuestId),
                        quizGuest.quizRoomId.eq(roomId),
                        quizGuest.totalCount.ne(0)
                )
                .orderBy(quizGuest.score.desc(), quizGuest.id.desc())
                .limit(pageable.getPageSize() + 1)
                .fetch();
        return checkLastPage(pageable, results);
    }

    public List<QuizRoomGuest> getParticipants(int roomId) {
        int rank = 1;
        List<QuizRoomGuest> results = queryFactory.select(
                Projections.constructor( QuizRoomGuest.class,
                    quizGuest.id,
                    quizGuest.guestNickname,
                    quizGuest.correctCount.divide(quizGuest.totalCount).floatValue().multiply(100),
                    quizGuest.score.intValue())
            )
            .from(quizGuest)
            .where(
                quizGuest.quizRoomId.eq(roomId),
                quizGuest.totalCount.ne(0)
            )
            .orderBy(quizGuest.score.desc())
            .fetch();
        return results;
    }

    public Slice<QuizRoomQuestion> getQuestions(int roomId) {
        List<QuizRoomQuestion> mostDifficultProblem =  queryFactory.select(
                        Projections.constructor( QuizRoomQuestion.class,
                                quizReport.id,
                                quizReport.question,
                                quizReport.correctCount.divide(quizReport.submitCount).floatValue().multiply(100))
                )
                .from(quizReport)
                .where(
                        quizReport.quizRoomId.eq(roomId),
                        quizReport.question.ne("game"),
                        quizReport.submitCount.ne(0)
                )
                .orderBy(
                        quizReport.correctCount.divide(quizReport.submitCount).floatValue().asc()
                )
                .limit(1)
                .fetch();

        List<QuizRoomQuestion> results = queryFactory.select(
                Projections.constructor( QuizRoomQuestion.class,
                        quizReport.id,
                        quizReport.question,
                        quizReport.correctCount.divide(quizReport.submitCount).floatValue().multiply(100))
                )
                .from(quizReport)
                .where(
                        quizReport.quizRoomId.eq(roomId),
                        quizReport.question.ne("game"),
                        quizReport.submitCount.ne(0)
                )
                .orderBy(
                        quizReport.id.asc()
                )
                .fetch();
        results.addAll(mostDifficultProblem);
        return new SliceImpl<>(results);
    }
}
