package com.luckquiz.quizroom.api.controller;

import com.google.gson.Gson;
import com.luckquiz.quizroom.api.request.DupliRequest;
import com.luckquiz.quizroom.api.request.QuizRoomCreateRequest;
import com.luckquiz.quizroom.api.request.QuizRoomEnterRequest;
import com.luckquiz.quizroom.api.request.QuizStartRequest;
import com.luckquiz.quizroom.api.response.Duplucheck;
import com.luckquiz.quizroom.api.service.QuizService;
import com.luckquiz.quizroom.model.EnterUser;
import com.luckquiz.quizroom.model.QuizMessage;
import com.luckquiz.quizroom.model.QuizRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
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

    private final SimpMessageSendingOperations sendingOperations;
    private final Gson gson;
    private  final StringRedisTemplate stringRedisTemplate;

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

    @GetMapping("/duplicate/{roomId}/{sender}")
    @ResponseBody
    public ResponseEntity nickNameDuplicated(@PathVariable String sender,@PathVariable Integer roomId){
        System.out.println(roomId.getClass());
        ValueOperations<String, String> stringStringValueOperations = stringRedisTemplate.opsForValue();
        String allList = stringStringValueOperations.get(roomId+"l",0,-1);
        String [] arr = allList.split(", ");
        String check = "true";
        for(String user: arr){
            EnterUser a = gson.fromJson(user,EnterUser.class);
            System.out.println(a.getSender() + "가 기존이고 오른쪽 "+sender);
            if(a.getSender().equals(sender)){
                check = "false";
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(check);
    }

}