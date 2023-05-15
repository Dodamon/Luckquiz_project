package com.luckquiz.quiz.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QTemplate is a Querydsl query type for Template
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTemplate extends EntityPathBase<Template> {

    private static final long serialVersionUID = 887778163L;

    public static final QTemplate template = new QTemplate("template");

    public final DateTimePath<java.time.LocalDateTime> date = createDateTime("date", java.time.LocalDateTime.class);

    public final ComparablePath<java.util.UUID> hostId = createComparable("hostId", java.util.UUID.class);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath isValid = createString("isValid");

    public final StringPath name = createString("name");

    public QTemplate(String variable) {
        super(Template.class, forVariable(variable));
    }

    public QTemplate(Path<? extends Template> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTemplate(PathMetadata metadata) {
        super(Template.class, metadata);
    }

}

