package com.luckquiz.auth.security.dto;

import java.util.Map;

public class KakaoOAuth2UserInfo extends OAuth2UserInfo {
    private Map<String, Object> profile_item;
    private Map<String, Object> properties;

    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
        this.properties = (Map<String, Object>) attributes.get("properties");
        this.profile_item = (Map<String, Object>) attributes.get("kakao_account");
    }

    @Override
    public String getProviderId() {
        return String.valueOf(attributes.get("id"));
    }

    @Override
    public ProviderType getProvider() {
        return ProviderType.KAKAO;
    }

    @Override
    public String getNickName() {
        return (String) properties.get("nickname");
    }

    @Override
    public String getEmail() {
        return (String) profile_item.get("email");
    }

    @Override
    public String getImageUrl() {
        return (String) properties.get("profile_image");
    }
}
