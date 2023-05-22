package com.luckquiz.auth.db.repository;



import com.luckquiz.auth.db.entity.Template;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TemplateRepository extends JpaRepository<Template, Integer> {

//    Page<Template> findTemplatesByHostId(int id, Pageable pageable);
    List<Template> findAllByHostId(UUID hostId);
}
