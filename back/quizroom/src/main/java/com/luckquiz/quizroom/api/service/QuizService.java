package com.luckquiz.quizroom.api.service;

import com.luckquiz.quizroom.api.request.QuizRoomStartRequest;
import com.luckquiz.quizroom.model.QuizRoom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class QuizService {
    private Map<String, QuizRoom> quizRoomMap;
    private final ToQuizProducer toQuizProducer;

    @PostConstruct
    //의존관게 주입완료되면 실행되는 코드
    private void init() {
        quizRoomMap = new LinkedHashMap<>();
    }

    //방 불러오기
    public List<QuizRoom> findAllRoom() {
        //방 최근 생성 순으로 반환
        List<QuizRoom> result = new ArrayList<>(quizRoomMap.values());
        Collections.reverse(result);
        return result;
    }

    //방 하나 불러오기
    public QuizRoom findById(String roomId) {
        return quizRoomMap.get(roomId);
    }

    //방 생성
    public QuizRoom createRoom(QuizRoomStartRequest qsr) {
        QuizRoom quizRoom = QuizRoom.create();
        quizRoomMap.put(quizRoom.getRoomId(), quizRoom);
        toQuizProducer.callQuizTemp(qsr.getHostId()+" "+quizRoom.getRoomId()+" "+qsr.getTemplateId());
        return quizRoom;
    }
}
