package com.luckquiz.quizRoom.api.service;

import com.luckquiz.quizRoom.api.response.QuizRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.*;

@Service
@RequiredArgsConstructor
public class QuizRoomSocketService {
    private Map<String, QuizRoom> quizRoomMap;

    @PostConstruct
    private void init(){
        quizRoomMap = new LinkedHashMap<>();
    }

    // 퀴즈방 잘 열렸나 확인 위한 전체 조회
    public List<QuizRoom> findAllRoom(){
        List quizRooms = new ArrayList<>(quizRoomMap.values());
        Collections.reverse(quizRooms);
        return quizRooms;
    }

    public QuizRoom findQuizRoomById(String roomId){
        return quizRoomMap.get(roomId);
    }

    public QuizRoom createQuizRoom(String name){
            QuizRoom quizRoom = QuizRoom.create(name);
            quizRoomMap.put(quizRoom.getRoomId(),quizRoom);
            return quizRoom;
    }
}
