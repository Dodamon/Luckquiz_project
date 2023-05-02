package com.luckquiz.auth.security.service;


import com.luckquiz.auth.common.exception.NotFoundException;
import com.luckquiz.auth.db.entity.User;
import com.luckquiz.auth.db.repository.UserRepository;
import com.luckquiz.auth.security.principal.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) {
        User user = null;

        try {
            user = userRepository.findByEmail(email).orElseThrow(
                    () -> new NotFoundException(email + " : User")
            );
        } catch (NotFoundException e) {
            throw new RuntimeException(e);
        }

        return UserPrincipal.create(user);
    }

    @Transactional
    public UserDetails loadUserById(UUID id) throws NotFoundException {
        User user = userRepository.findById(id).orElseThrow(
                () -> new NotFoundException(id + ": User")
        );
        return UserPrincipal.create(user);
    }

}