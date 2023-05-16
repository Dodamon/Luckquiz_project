package com.luckquiz.quiz.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QQuizReport is a Querydsl query type for QuizReport
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QQuizReport extends EntityPathBase<QuizReport> {

    private static final long serialVersionUID = 1354388642L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QQuizReport quizReport = new QQuizReport("quizReport");

    public final NumberPath<Integer> correctCount = createNumber("correctCount", Integer.class);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final NumberPath<Integer> pinNum = createNumber("pinNum", Integer.class);

    public final StringPath question = createString("question");

    public final NumberPath<Integer> quizGameId = createNumber("quizGameId", Integer.class);

    public final QQuizRoom quizRoom;

    public final NumberPath<Integer> submitCount = createNumber("submitCount", Integer.class);

    public QQuizReport(String variable) {
        this(QuizReport.class, forVariable(variable), INITS);
    }

    public QQuizReport(Path<? extends QuizReport> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QQuizReport(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QQuizReport(PathMetadata metadata, PathInits inits) {
        this(QuizReport.class, metadata, inits);
    }

    public QQuizReport(Class<? extends QuizReport> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.quizRoom = inits.isInitialized("quizRoom") ? new QQuizRoom(forProperty("quizRoom"), inits.get("quizRoom")) : null;
    }

}

