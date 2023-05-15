package com.luckquiz.quiz.db.repository;

import com.luckquiz.quiz.db.entity.QuizGuest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuizGuestRepository extends JpaRepository<QuizGuest, Integer> {
    Optional<QuizGuest> findByTemplateId(Integer templateId);
}

