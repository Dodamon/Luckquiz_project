package com.luckquiz.auth.db.repository;

import com.luckquiz.auth.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;


public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findById(Long userId);

    Optional<User> findByEmail(String email);

    Optional<User> findUserByName(String nickName);

    Boolean existsByEmail(String email);

}
