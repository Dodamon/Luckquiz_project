package com.luckquiz.quizroom.api.controller;

import com.luckquiz.quizroom.api.request.QuizRoomCreateRequest;
import com.luckquiz.quizroom.api.request.QuizRoomEnterRequest;
import com.luckquiz.quizroom.api.request.QuizStartRequest;
import com.luckquiz.quizroom.api.service.QuizService;
import com.luckquiz.quizroom.model.QuizRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/quizroom")
public class ChatRoomController { // for controller update
    private final QuizService quizService;

    // 채팅 리스트 화면
    @GetMapping("/room")
    public String rooms(Model model) {
        return "/chat/room";
    }
    // 모든 채팅방 목록 반환
    @GetMapping("/rooms")
    public List<QuizRoom> room() {
        return quizService.findAllRoom();
    }
    // 채팅방 생성
    @PostMapping("/create")
    @ResponseBody
    public QuizRoom createRoom(@RequestBody QuizRoomCreateRequest qsr) {
        return quizService.createRoom(qsr);
    }

    // 호스트가 튕겼을 경우를 대비해서 다시 방을 찾는다.
    @GetMapping("/redirect")
    @ResponseBody
    public Integer roomInfo(@RequestParam String hostId) {
        UUID rId = UUID.fromString(hostId);
        return quizService.findById(rId);
    }

    @PostMapping("/start")
    @ResponseBody
    public void quizStart(@RequestBody QuizStartRequest quizStartRequest){
        quizService.startQuiz(quizStartRequest);
    }

}