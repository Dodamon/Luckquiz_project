package com.luckquiz.quizRoom.db.repository;

import com.luckquiz.quizRoom.db.entity.QuizRoom;
import org.springframework.data.jpa.repository.JpaRepository;

// 이거 안해도 됨돠 JPAREPOSITORY extends 하면 알아서 되던뎁숑
public interface QuizRoomRepository extends JpaRepository<QuizRoom, Integer> {
    // 어떤 템플릿으로 열린 퀴즈방들 찾기.
//    Page<QuizRoom> findQuizRoomsByTemplateId(int id, Pageable pageable);
    

}
