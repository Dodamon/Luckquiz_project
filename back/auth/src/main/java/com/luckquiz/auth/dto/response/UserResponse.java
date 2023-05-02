package com.luckquiz.auth.dto.response;

import com.luckquiz.auth.db.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@AllArgsConstructor
public class UserResponse {

    private final UUID id;
    private final String name;
    private String email;
    private String image_url;
    private LocalDateTime createdAt;

    public UserResponse(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.image_url = user.getImage_url();
        this.createdAt = user.getCreatedAt();
    }

}
