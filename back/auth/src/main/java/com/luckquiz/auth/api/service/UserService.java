package com.luckquiz.auth.api.service;

import com.luckquiz.auth.common.exception.NotFoundException;
import com.luckquiz.auth.db.entity.User;
import com.luckquiz.auth.db.repository.UserRepository;
import com.luckquiz.auth.dto.response.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;

    private User findUser(Long userId) throws NotFoundException {
        return userRepository.findById(userId).orElseThrow(() -> new NotFoundException(userId + " : User"));
    }

    public UserResponse getUserInfo(UUID userId) {
        return new UserResponse(userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("해당 유저를 찾을 수가 없습니다")));
    }

}
