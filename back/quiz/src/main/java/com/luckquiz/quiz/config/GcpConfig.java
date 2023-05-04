package com.luckquiz.quiz.config;

import com.google.api.client.util.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import java.io.IOException;

@Configuration
public class GcpConfig {
    @Value("snappy-analog-384101")
    private String projectId;

    private ClassPathResource credentials = new ClassPathResource("json/snappy-analog-384101-5ff843401827.json");

    @Bean
    public Storage storage() throws IOException {
        return StorageOptions.newBuilder()
                .setProjectId(projectId)
                .setCredentials(GoogleCredentials.fromStream(credentials.getInputStream()))
                .build()
                .getService();
    }
}