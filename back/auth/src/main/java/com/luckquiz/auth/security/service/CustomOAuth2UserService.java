package com.luckquiz.auth.security.service;

import com.luckquiz.auth.common.exception.BadRequestException;
import com.luckquiz.auth.common.exception.NotFoundException;
import com.luckquiz.auth.common.exception.UserNotFoundException;
import com.luckquiz.auth.db.entity.User;
import com.luckquiz.auth.db.entity.UserSocial;
import com.luckquiz.auth.db.repository.UserRepository;
import com.luckquiz.auth.db.repository.UserSocialRepository;
import com.luckquiz.auth.security.dto.OAuth2UserInfo;
import com.luckquiz.auth.security.dto.OAuth2UserInfoFactory;
import com.luckquiz.auth.security.principal.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
    private final UserSocialRepository userSocialRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) throws UserNotFoundException, BadRequestException {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
        // 가져온 정보에서 이메일이 비어있을 경우 예외 발생
        if (StringUtils.isEmpty(oAuth2UserInfo.getEmail())) {
            log.error("이메일을 찾을 수 없다");
            throw new NotFoundException("Email not found from OAuth2 provider");
        }


        // 유저가 DB에 등록되어있는지 확인
        Optional<User> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());
        User user;
        if (userOptional.isPresent()) {
            user = userOptional.get();
            // 유저가 DB에 있으면 변경된 값을 업데이트 해준다.
            user = updateExistingUser(user, oAuth2UserInfo);
        } else {
            // 유저가 DB에 없다면 등록을 해준다
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }

        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }

    private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        User user = User.builder()
                .name(oAuth2UserInfo.getNickName())
                .email(oAuth2UserInfo.getEmail())
                .image_url(oAuth2UserInfo.getImageUrl())
                .build();
        user = userRepository.save(user);

        UserSocial userSocial = UserSocial.builder()
                .provider_user_id(oAuth2UserInfo.getProviderId())
                .access_token(oAuth2UserRequest.getAccessToken().getTokenValue())
                .refresh_token("")
                .user(user)
                .provider(oAuth2UserInfo.getProvider())
                .build();
        userSocial = userSocialRepository.save(userSocial);

        return user;
    }

    private User updateExistingUser(User user, OAuth2UserInfo oAuth2UserInfo) {
        user.setName(oAuth2UserInfo.getNickName());
        user.setImage_url(oAuth2UserInfo.getImageUrl());
        return userRepository.save(user);
    }

}