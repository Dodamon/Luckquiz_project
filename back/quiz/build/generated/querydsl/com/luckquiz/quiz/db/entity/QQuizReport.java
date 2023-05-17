package com.luckquiz.quiz.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QQuizReport is a Querydsl query type for QuizReport
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QQuizReport extends EntityPathBase<QuizReport> {

    private static final long serialVersionUID = 1354388642L;

    public static final QQuizReport quizReport = new QQuizReport("quizReport");

    public final NumberPath<Integer> correctCount = createNumber("correctCount", Integer.class);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final NumberPath<Integer> pinNum = createNumber("pinNum", Integer.class);

    public final StringPath question = createString("question");

    public final NumberPath<Integer> quizGameId = createNumber("quizGameId", Integer.class);

    public final NumberPath<Integer> quizRoomId = createNumber("quizRoomId", Integer.class);

    public final NumberPath<Integer> submitCount = createNumber("submitCount", Integer.class);

    public final ComparablePath<java.util.UUID> userId = createComparable("userId", java.util.UUID.class);

    public QQuizReport(String variable) {
        super(QuizReport.class, forVariable(variable));
    }

    public QQuizReport(Path<? extends QuizReport> path) {
        super(path.getType(), path.getMetadata());
    }

    public QQuizReport(PathMetadata metadata) {
        super(QuizReport.class, metadata);
    }

}

