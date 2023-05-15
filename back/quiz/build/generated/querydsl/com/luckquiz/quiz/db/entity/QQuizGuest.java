package com.luckquiz.quiz.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QQuizGuest is a Querydsl query type for QuizGuest
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QQuizGuest extends EntityPathBase<QuizGuest> {

    private static final long serialVersionUID = 1696565418L;

    public static final QQuizGuest quizGuest = new QQuizGuest("quizGuest");

    public final NumberPath<Integer> correctCount = createNumber("correctCount", Integer.class);

    public final StringPath guestNickname = createString("guestNickname");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final NumberPath<Integer> pinNum = createNumber("pinNum", Integer.class);

    public final NumberPath<Double> score = createNumber("score", Double.class);

    public final NumberPath<Integer> templateId = createNumber("templateId", Integer.class);

    public final NumberPath<Integer> totalCount = createNumber("totalCount", Integer.class);

    public QQuizGuest(String variable) {
        super(QuizGuest.class, forVariable(variable));
    }

    public QQuizGuest(Path<? extends QuizGuest> path) {
        super(path.getType(), path.getMetadata());
    }

    public QQuizGuest(PathMetadata metadata) {
        super(QuizGuest.class, metadata);
    }

}

