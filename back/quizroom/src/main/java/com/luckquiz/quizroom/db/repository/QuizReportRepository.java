package com.luckquiz.quizroom.db.repository;

import com.luckquiz.quizroom.db.entities.QuizReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizReportRepository extends JpaRepository<QuizReport, Integer> {
   QuizReport findQuizReportById(Integer id);
   QuizReport findQuizReportByPinNum(Integer pinNum);
}
