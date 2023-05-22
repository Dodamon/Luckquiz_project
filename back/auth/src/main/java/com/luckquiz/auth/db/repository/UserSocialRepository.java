package com.luckquiz.auth.db.repository;

import com.luckquiz.auth.db.entity.UserSocial;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserSocialRepository extends JpaRepository<UserSocial, Long> {
}
