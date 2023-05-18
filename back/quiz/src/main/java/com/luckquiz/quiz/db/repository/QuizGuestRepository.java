package com.luckquiz.quiz.db.repository;

import com.luckquiz.quiz.db.entity.QuizGuest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuizGuestRepository extends JpaRepository<QuizGuest, Integer> {
    Optional<QuizGuest> findByTemplateId(Integer templateId);
    Optional<QuizGuest> findQuizGuestByPinNum(Integer pinNum);

    boolean existsByGuestNickname(String guestNickName);
    Optional<QuizGuest> findQuizGuestByGuestNicknameAndQuizRoomId(String guestNickname,int quizRoomId);
    List<QuizGuest> findQuizGuestsByQuizRoomId(int roomId);
}

//알톡깃톡안톡챗 화이팅