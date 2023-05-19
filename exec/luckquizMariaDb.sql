-- we don't know how to generate root <with-no-name> (class Root) :(
create table quiz_game
(
    id          int auto_increment
        primary key,
    template_id int                                                                      null,
    type        enum ('four', 'ox', 'text', 'egg', 'balloon', 'game', 'quiz', 'emotion') null,
    quiz        longblob                                                                 null comment 'question,answer, choice',
    timer       int         default 7                                                    null,
    is_valid    varchar(10) default '0'                                                  null
);

create table quiz_guest
(
    id             int auto_increment
        primary key,
    template_id    int         null,
    guest_nickname varchar(50) null,
    pin_num        int         null,
    count          int         null,
    total_count    int         null,
    score          int         null,
    quiz_room_id   int         null,
    host_id        binary(16)  null
);

create table quiz_report
(
    id            int auto_increment comment '활성화된 퀴즈방의 퀴즈별 결과저장'
        primary key,
    quiz_game_id  int          null,
    correct_count int          null,
    quiz          varchar(255) null comment '퀴즈 정보를 저장',
    submit_count  int          null,
    pin_num       int(7)       null,
    question      varchar(255) null,
    quiz_room_id  int          null,
    user_id       binary(16)   null
);

create table quiz_room
(
    id                int auto_increment
        primary key,
    created_time      timestamp  default current_timestamp() not null,
    inactive          tinyint(1) default 0                   not null comment '비활성시 true',
    finished_time     timestamp                              null,
    participant_count int                                    null,
    correct_count     int                                    null,
    submit_count      int                                    null,
    pin_num           int(7)                                 null,
    host_id           binary(16)                             null,
    quiz_count        int                                    null,
    game_count        int                                    null,
    template_name     varchar(255)                           null,
    template_id       int                                    null
);

create table template
(
    id       int auto_increment
        primary key,
    name     varchar(50)             null,
    host_id  binary(16)              not null,
    date     datetime                null,
    is_valid varchar(10) default '0' null
);

create table user
(
    id         binary(16)                           not null comment 'pk'
        primary key,
    name       varchar(50)                          not null,
    email      varchar(50)                          not null,
    image_url  varchar(255)                         null comment 'url',
    created_at datetime default current_timestamp() not null
)
    charset = utf8mb3;

create table user_social
(
    id               int unsigned auto_increment comment 'pk'
        primary key,
    user_id          binary(16)   not null comment 'fk',
    provider         varchar(50)  null,
    provider_user_id varchar(100) not null,
    access_token     varchar(255) not null,
    refresh_token    varchar(255) not null,
    constraint user_id
        foreign key (user_id) references user (id)
);

