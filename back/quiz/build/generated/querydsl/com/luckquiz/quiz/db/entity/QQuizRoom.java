package com.luckquiz.quiz.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QQuizRoom is a Querydsl query type for QuizRoom
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QQuizRoom extends EntityPathBase<QuizRoom> {

    private static final long serialVersionUID = 1163428809L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QQuizRoom quizRoom = new QQuizRoom("quizRoom");

    public final NumberPath<Integer> correctCount = createNumber("correctCount", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> createdTime = createDateTime("createdTime", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> finishedTime = createDateTime("finishedTime", java.time.LocalDateTime.class);

    public final NumberPath<Integer> gameCount = createNumber("gameCount", Integer.class);

    public final ComparablePath<java.util.UUID> hostId = createComparable("hostId", java.util.UUID.class);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final BooleanPath inactive = createBoolean("inactive");

    public final NumberPath<Integer> participantCount = createNumber("participantCount", Integer.class);

    public final NumberPath<Integer> pinNum = createNumber("pinNum", Integer.class);

    public final NumberPath<Integer> quizCount = createNumber("quizCount", Integer.class);

    public final NumberPath<Integer> submitCount = createNumber("submitCount", Integer.class);

    public final QTemplate template;

    public QQuizRoom(String variable) {
        this(QuizRoom.class, forVariable(variable), INITS);
    }

    public QQuizRoom(Path<? extends QuizRoom> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QQuizRoom(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QQuizRoom(PathMetadata metadata, PathInits inits) {
        this(QuizRoom.class, metadata, inits);
    }

    public QQuizRoom(Class<? extends QuizRoom> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.template = inits.isInitialized("template") ? new QTemplate(forProperty("template")) : null;
    }

}

