package com.luckquiz.quiz.db.repository;

import com.luckquiz.quiz.db.entity.QuizRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// 이거 안해도 됨돠 JPAREPOSITORY extends 하면 알아서 되던뎁숑
public interface QuizRoomRepository extends JpaRepository<QuizRoom, Integer> {
    // 어떤 템플릿으로 열린 퀴즈방들 찾기.
//    Page<QuizRoom> findQuizRoomsByTemplateId(int id, Pageable pageable);


    @Override
    Optional<QuizRoom> findById(Integer integer);
}
