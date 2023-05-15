package com.luckquiz.quiz.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QQuizGame is a Querydsl query type for QuizGame
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QQuizGame extends EntityPathBase<QuizGame> {

    private static final long serialVersionUID = 1163087584L;

    public static final QQuizGame quizGame = new QQuizGame("quizGame");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath isValid = createString("isValid");

    public final ArrayPath<byte[], Byte> quiz = createArray("quiz", byte[].class);

    public final NumberPath<Integer> templateId = createNumber("templateId", Integer.class);

    public final NumberPath<Integer> timer = createNumber("timer", Integer.class);

    public final EnumPath<QuizType> type = createEnum("type", QuizType.class);

    public QQuizGame(String variable) {
        super(QuizGame.class, forVariable(variable));
    }

    public QQuizGame(Path<? extends QuizGame> path) {
        super(path.getType(), path.getMetadata());
    }

    public QQuizGame(PathMetadata metadata) {
        super(QuizGame.class, metadata);
    }

}

