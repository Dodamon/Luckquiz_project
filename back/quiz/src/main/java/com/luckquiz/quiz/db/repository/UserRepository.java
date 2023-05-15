package com.luckquiz.quiz.db.repository;

import com.luckquiz.quiz.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findUserById(UUID hostId);
}
