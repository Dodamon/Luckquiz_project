package com.luckquiz.quizRoom.api.service;


import com.luckquiz.quizRoom.api.response.TemplateDetailResponse;
import com.luckquiz.quizRoom.api.response.TemplateInfoResponse;
import com.luckquiz.quizRoom.common.exception.CustomException;
import com.luckquiz.quizRoom.common.exception.CustomExceptionType;
import com.luckquiz.quizRoom.db.entity.QuizGame;
import com.luckquiz.quizRoom.db.entity.QuizType;
import com.luckquiz.quizRoom.db.entity.Template;
import com.luckquiz.quizRoom.db.repository.QuizGameRepository;
import com.luckquiz.quizRoom.db.repository.TemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
// 템플랫 생성, 조회, 다수조회, 퀴즈추가
public class TemplateService {
    private final TemplateRepository templateRepository;
    private final QuizGameRepository quizGameRepository;

    public TemplateDetailResponse findTemplateDetail(int templateId, int hostId) throws  Exception{
        Template template = templateRepository.findTemplateByIdAndHostId(templateId,hostId).orElseThrow(()->new CustomException(CustomExceptionType.TEMPLATE_NOT_FOUND));
        // template 을 조회를 해 있는거겠지 그러니까 그 다음에도 있어야해?
        List<QuizGame> quizList = quizGameRepository.findQuizGamesByTemplateId(templateId);
        List<TemplateInfoResponse> quizs = new ArrayList<>();
        for(QuizGame a : quizList){
            TemplateInfoResponse qgr = new TemplateInfoResponse();
            QuizType type = a.getType();
            String quizDumb = new String(a.getQuiz(),"UTF-8");
            String[] quizDummy = quizDumb.split("``");
            switch (type){
                case text:
                    String [] asList = quizDummy[3].split("₩₩");
                    qgr.setQuiz(quizDummy[0]);
                    qgr.setQuizUrl(quizDummy[1]);
                    qgr.setAnswer(quizDummy[2]);
                    qgr.setAnswerList(asList);
                    break;
                case four:
                    qgr.setQuiz(quizDummy[0]);
                    qgr.setQuizUrl(quizDummy[1]);
                    qgr.setOne(quizDummy[2]);
                    qgr.setTwo(quizDummy[3]);
                    qgr.setThree(quizDummy[4]);
                    qgr.setFour(quizDummy[5]);
                    qgr.setAnswer(quizDummy[6]);
                    break;
                case ox:
                    qgr.setQuiz(quizDummy[0]);
                    qgr.setQuizUrl(quizDummy[1]);
                    qgr.setAnswer(quizDummy[2]);
                    break;
                default:
                    qgr.setGame(type.toString());
            }
            qgr.setTimer(a.getTimer());
            qgr.setQuizType(a.getType());
            qgr.setId(a.getId());
            quizs.add(qgr);
        }

        String[] numb = template.getNumbering().split("``");

        TemplateDetailResponse result = TemplateDetailResponse.builder()
                .id(template.getId())
                .hostId(template.getHostId())
                .name(template.getName())
                .quizList(quizs)
                .numbering(numb)
                .build();

        return result;
    }

}
