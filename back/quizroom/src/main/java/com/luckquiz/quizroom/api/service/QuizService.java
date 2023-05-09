package com.luckquiz.quizroom.api.service;

import com.google.gson.Gson;
import com.luckquiz.quizroom.api.request.QuizRoomCreateRequest;
import com.luckquiz.quizroom.api.request.QuizRoomEnterRequest;
import com.luckquiz.quizroom.api.request.QuizStartRequest;
import com.luckquiz.quizroom.api.request.RTSearch;
import com.luckquiz.quizroom.api.response.QGame;
import com.luckquiz.quizroom.api.response.TemplateDetailResponse;
import com.luckquiz.quizroom.model.NextMessage;
import com.luckquiz.quizroom.model.QuizRoom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class QuizService {
    private Map<String, QuizRoom> quizRoomMap;
    private final Gson gson;
    private final ToQuizProducer toQuizProducer;

    private  final StringRedisTemplate stringRedisTemplate;

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

    // 방 하나 불러오기
    // 혹여 host 가 메인 룸에서 튕겼을 때를 대비함.
    public Integer findById(UUID hostId) {
        String room = stringRedisTemplate.opsForValue().get(hostId.toString());
        System.out.println(room);
        RTSearch rtSearch = gson.fromJson(room,RTSearch.class);
        System.out.println(rtSearch.getRoomId());
        return rtSearch.getRoomId();
    }

    //방 생성
    @Transactional
    public QuizRoom createRoom(QuizRoomCreateRequest qrc) {
        QuizRoom quizRoom = QuizRoom.create();
        quizRoomMap.put(quizRoom.getRoomId(), quizRoom);

        toQuizProducer.callQuizTemp(qrc.getHostId()+" "+quizRoom.getRoomId()+" "+qrc.getTemplateId());
        return quizRoom;
    }


    public QGame startQuiz(QuizStartRequest quizStartRequest){
        String room = stringRedisTemplate.opsForValue().get(quizStartRequest.getRoomId().toString());
        TemplateDetailResponse templateDetailResponse = gson.fromJson(room,TemplateDetailResponse.class);
        QGame firstQuiz = templateDetailResponse.getQuizList().get(0);
        firstQuiz.setQuizNum(0);
        firstQuiz.setQuizSize(templateDetailResponse.getQuizList().size());

        templateDetailResponse.setQuizNum(0);
        String newVal = gson.toJson(templateDetailResponse);
        stringRedisTemplate.opsForValue().set(quizStartRequest.getRoomId().toString(),newVal);
        return firstQuiz;
    }
    @Transactional
    public QGame nextQuiz(NextMessage nextMessage) {
        String room = stringRedisTemplate.opsForValue().get(nextMessage.getRoomId().toString());
        TemplateDetailResponse templateDetailResponse = gson.fromJson(room,TemplateDetailResponse.class);
        QGame nextQuiz = templateDetailResponse.getQuizList().get(templateDetailResponse.getQuizNum()+1);
        templateDetailResponse.setQuizNum(templateDetailResponse.getQuizNum()+1);
        String newVal = gson.toJson(templateDetailResponse);
        stringRedisTemplate.opsForValue().set(nextMessage.getRoomId().toString(),newVal);
        nextQuiz.setQuizNum(templateDetailResponse.getQuizNum());
        nextQuiz.setQuizSize(templateDetailResponse.getQuizList().size());
        return nextQuiz;
    }


}
