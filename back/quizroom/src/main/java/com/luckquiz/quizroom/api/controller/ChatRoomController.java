package com.luckquiz.quizroom.api.controller;

import com.luckquiz.quizroom.api.request.QuizRoomStartRequest;
import com.luckquiz.quizroom.api.service.QuizService;
import com.luckquiz.quizroom.model.QuizRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("api/quizroom")
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
    @PostMapping("/room")
    @ResponseBody
    public QuizRoom createRoom(@RequestBody QuizRoomStartRequest qsr) {
        return quizService.createRoom(qsr);
    }
    // 채팅방 입장 화면
    @GetMapping("/room/enter/{roomId}")
    public String roomDetail(Model model, @PathVariable String roomId) {
        model.addAttribute("roomId", roomId);
        return "/chat/roomdetail";
    }
    // 특정 채팅방 조회
    @GetMapping("/room/{roomId}")
    @ResponseBody
    public QuizRoom roomInfo(@PathVariable String roomId) {
        return quizService.findById(roomId);
    }

}