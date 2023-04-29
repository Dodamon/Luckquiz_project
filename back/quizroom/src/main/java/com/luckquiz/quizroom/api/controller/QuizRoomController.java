package com.luckquiz.quizRoom.api.controller;

import com.luckquiz.quizRoom.api.response.QuizRoom;
import com.luckquiz.quizRoom.api.service.QuizRoomSocketService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/quizRoom")
@RequiredArgsConstructor
public class QuizRoomController {
    private final QuizRoomSocketService quizRoomSocketService;

    @PostMapping("/create")
    @ResponseBody
    public QuizRoom createRoom(@RequestBody String name){
        return quizRoomSocketService.createQuizRoom(name);
    }

    @GetMapping("/room/enter/{roomId}")
    @ResponseBody
    public String roomEnter(Model model, @PathVariable String roomId){
        model.addAttribute("roomId",roomId);
        return "/quizRoom/roomEnter";
    }

    @MessageMapping("/room/{roomId}")
    @ResponseBody
    public QuizRoom roomInfo(@PathVariable String roomId){
        return quizRoomSocketService.findQuizRoomById(roomId);
    }
}

