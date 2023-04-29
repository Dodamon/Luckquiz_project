package com.luckquiz.quizRoom.api.controller;

import com.luckquiz.quizRoom.api.response.TemplateDetailResponse;
import com.luckquiz.quizRoom.api.service.GcpService;
import com.luckquiz.quizRoom.api.service.TemplateService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/quiz")
@AllArgsConstructor
public class QuizTemplateController {
    // 요청받았을 때 해당하는 템플릿 쏴주는 것
    private final TemplateService templateService;
    private final GcpService gcpService;

    // 혹시 모를 자잘한 이미지 업로드가 있을까봐하여 맹글어두었읍니다...
    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam(value = "file", required = false) MultipartFile file) throws Exception{
        String result = gcpService.uploadFile(file);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }
    @GetMapping("/template/info")
    public ResponseEntity<TemplateDetailResponse> templateInfo(@RequestParam int templateId,int hostId) throws Exception{
        return ResponseEntity.ok(templateService.findTemplateDetail(templateId,hostId));

    }


}
