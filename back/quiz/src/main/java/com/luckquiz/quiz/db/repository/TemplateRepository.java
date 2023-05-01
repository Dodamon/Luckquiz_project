package com.luckquiz.quiz.db.repository;


import com.luckquiz.quiz.db.entity.Template;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TemplateRepository extends JpaRepository<Template, Integer> {

//    Page<Template> findTemplatesByHostId(int id, Pageable pageable);
    Optional<Template> findTemplateByIdAndHostId(int id, int hostId);
    Optional<Template> findTemplateById(int id);
    Slice<Template> findTemplatesByHostId(int id, Pageable pageable);

    Boolean existsByIdAndHostId(int id, int hostId);
}
