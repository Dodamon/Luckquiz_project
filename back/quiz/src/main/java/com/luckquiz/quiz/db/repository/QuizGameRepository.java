package com.luckquiz.quiz.db.repository;

import com.luckquiz.quiz.db.entity.QuizGame;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuizGameRepository extends JpaRepository<QuizGame,Integer> {

    int deleteByTemplateId(int templateId);
    Boolean existsByTemplateId(int templateId);
    List<QuizGame> findQuizGamesByTemplateId(Integer id, Pageable pageable);

    List<QuizGame> findQuizGamesByTemplateId(int id);
}
