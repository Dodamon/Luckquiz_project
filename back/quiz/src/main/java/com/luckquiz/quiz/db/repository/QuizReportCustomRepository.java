package com.luckquiz.quiz.db.repository;

import com.luckquiz.quiz.api.response.QuizReportGuest;
import com.luckquiz.quiz.api.response.QuizReportProblem;
import com.luckquiz.quiz.db.entity.QuizType;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

import java.util.List;

import static com.luckquiz.quiz.db.entity.QQuizGame.quizGame;
import static com.luckquiz.quiz.db.entity.QQuizGuest.quizGuest;
import static com.luckquiz.quiz.db.entity.QQuizReport.quizReport;

@Repository
@Slf4j
public class QuizReportCustomRepository {
    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    public QuizReportCustomRepository(EntityManager em)
    {
        this.em = em;
        this.queryFactory = new JPAQueryFactory(em);
    }

    private BooleanExpression ltQuizGuestId(int guestId) {
        if(guestId == 0) {
            return quizGuest.id.lt(Integer.MAX_VALUE);
        }
        return quizGuest.id.lt(guestId);
    }

    // 무한 스크롤 방식 처리하는 메서드
    private Slice<QuizReportGuest> checkLastPage(Pageable pageable, List<QuizReportGuest> results) {
        boolean hasNext = false;
        // 조회한 결과 개수가 요청한 페이지 사이즈보다 크면 뒤에 더 있음, next = true
        if (results.size() > pageable.getPageSize()) {
            hasNext = true;
            results.remove(pageable.getPageSize());
        }
        return new SliceImpl<>(results, pageable, hasNext);
    }

    public Slice<QuizReportGuest> getParticipants(int pinNum, int lastGuestId, Pageable pageable) {
        List<QuizReportGuest> results = queryFactory.select(
                Projections.constructor( QuizReportGuest.class,
                        quizGuest.id,
                        quizGuest.guestNickname,
                        quizGuest.correctCount.divide(quizGuest.totalCount),
                        quizGuest.score)
                )
                .from(quizGuest)
                .where(
                        ltQuizGuestId(lastGuestId),
                        quizGuest.pinNum.eq(pinNum)
                )
                .orderBy(quizGuest.id.desc(), quizGuest.score.desc())
                .limit(pageable.getPageSize() + 1)
                .fetch();
        return checkLastPage(pageable, results);
    }

    public Slice<QuizReportProblem> getProblems(int pinNum, int templateId) {
        List<QuizReportProblem> mostDifficultProblem =  queryFactory.select(
                        Projections.constructor( QuizReportProblem.class,
                                quizReport.quizGameId,
                                quizReport.question,
                                quizReport.correctCount.divide(quizGuest.totalCount))
                )
                .from(quizGuest)
                .where(
                        quizGame.type.eq(QuizType.quiz)
                )
                .orderBy(
                        quizReport.correctCount.divide(quizReport.submitCount).asc()
                )
                .limit(1)
                .fetch();

        List<QuizReportProblem> results = queryFactory.select(
                Projections.constructor( QuizReportProblem.class,
                        quizReport.quizGameId,
                        quizGame.quiz,
                        quizReport.correctCount.divide(quizGuest.totalCount))
                )
                .from(quizGuest)
                .innerJoin(quizGame).fetchJoin()
                .on(quizGame.id.eq(quizReport.quizGameId))
                .where(
                        quizGame.type.eq(QuizType.quiz)
                )
                .orderBy(
                        quizReport.id.asc()
                )
                .fetch();

        results.addAll(mostDifficultProblem);

        return new SliceImpl<>(results);
    }
}
