package com.luckquiz.quiz.api.controller;

import com.luckquiz.quiz.api.request.QuizGameCreateRequest;
import com.luckquiz.quiz.api.request.TemplateCreateRequest;
import com.luckquiz.quiz.api.request.TemplateDeleteRequest;
import com.luckquiz.quiz.api.request.TemplateRedisRequest;
import com.luckquiz.quiz.api.response.QGCreateResponse;
import com.luckquiz.quiz.api.response.TemplateDetailResponse;
import com.luckquiz.quiz.api.service.GcpService;
import com.luckquiz.quiz.api.service.RedisTransService;
import com.luckquiz.quiz.api.service.TemplateService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.UUID;

@RestController
@RequestMapping("/api/quiz")
@AllArgsConstructor
public class QuizController {
    // 요청받았을 때 해당하는 템플릿 쏴주는 것
    private final TemplateService templateService;
    private final GcpService gcpService;

    private final RedisTransService redisTransService;

    // 혹시 모를 자잘한 이미지 업로드가 있을까봐하여 맹글어두었읍니다...
    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam(value = "file", required = false) MultipartFile file) throws Exception{
        String result = gcpService.uploadFile(file);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }
    // 템플릿 만들기
    @PostMapping("/template/regist")
    @ResponseBody
    public ResponseEntity<Integer> registTemplate(@RequestBody TemplateCreateRequest tcr)throws Exception{
        return ResponseEntity.status(HttpStatus.CREATED).body(templateService.createTemplate(tcr));
    }

    @PostMapping("/template/delete")
    @ResponseBody
    public ResponseEntity<Boolean> deleteTemplate(@RequestBody TemplateDeleteRequest tdr) {
        return ResponseEntity.ok(templateService.deleteTemplate(tdr));
    }

    // 퀴즈 만들기 - 이유 update 가 아닌 create 로 하는거라 수정과 생성이 똑같다.
    @PostMapping("/template/contents-create")
    @ResponseBody
    public ResponseEntity<TemplateDetailResponse> insertQuizGame(@RequestBody QuizGameCreateRequest qcr)throws Exception{
        return ResponseEntity.status(HttpStatus.CREATED).body(templateService.quizGameCreate(qcr));
    }

    @GetMapping("/template/info")
    public ResponseEntity<TemplateDetailResponse> templateInfo(@RequestParam int templateId, String hostId) throws Exception{
        UUID hostUUID = UUID.fromString(hostId);
        return ResponseEntity.ok(templateService.findTemplateDetail(templateId,hostUUID));
    }


}
