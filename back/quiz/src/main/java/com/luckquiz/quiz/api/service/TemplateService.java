package com.luckquiz.quiz.api.service;

import com.luckquiz.quiz.api.request.QGame;
import com.luckquiz.quiz.api.request.QuizGameCreateRequest;
import com.luckquiz.quiz.api.request.TemplateCreateRequest;
import com.luckquiz.quiz.api.request.TemplateDeleteRequest;
import com.luckquiz.quiz.api.response.QGCreateResponse;
import com.luckquiz.quiz.api.response.TemplateDetailResponse;
import com.luckquiz.quiz.api.response.TemplateInfoResponse;
import com.luckquiz.quiz.api.response.TemplateResponse;
import com.luckquiz.quiz.common.exception.CustomException;
import com.luckquiz.quiz.common.exception.CustomExceptionType;
import com.luckquiz.quiz.db.entity.QuizGame;
import com.luckquiz.quiz.db.entity.QuizType;
import com.luckquiz.quiz.db.entity.Template;
import com.luckquiz.quiz.db.repository.QuizGameRepository;
import com.luckquiz.quiz.db.repository.TemplateRepository;
import lombok.RequiredArgsConstructor;
import org.apache.el.util.ReflectionUtil;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.nio.charset.Charset;

import java.util.ArrayList;
import java.util.List;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
// 템플랫 생성, 조회, 다수조회, 퀴즈추가
public class TemplateService {
    private final TemplateRepository templateRepository;

    private final QuizGameRepository quizGameRepository;

    @Transactional
    public int createTemplate(TemplateCreateRequest tcr) {
        Template temp = Template.builder()
                .hostId(tcr.getHostId())
                .name(tcr.getName())
                .build();
        Template a = templateRepository.save(temp);
        return a.getId();
    }

    @Transactional
    public Boolean deleteTemplate(TemplateDeleteRequest tdr) {
        Template template = templateRepository.findTemplateByIdAndHostId(tdr.getId(), tdr.getHostId()).orElseThrow(() -> new CustomException(CustomExceptionType.TEMPLATE_NOT_FOUND));
        templateRepository.delete(template);
        return true;
    }


    public Slice<TemplateResponse> findTemplates(int hostId, @PageableDefault(size = 8, sort = {"created_at"}) Pageable pageable) {
        Slice<Template> tempList = templateRepository.findTemplatesByHostId(hostId, pageable);
        Slice<TemplateResponse> result = tempList.map((template) -> TemplateResponse.builder()
                .hostId(template.getHostId())
                .name(template.getName())
                .id(template.getId())
                .build());
        return result;
    }

    public TemplateDetailResponse findTemplateDetail(int templateId, int hostId) throws Exception {
        Template template = templateRepository.findTemplateByIdAndHostId(templateId, hostId).orElseThrow(() -> new CustomException(CustomExceptionType.TEMPLATE_NOT_FOUND));
        // template 을 조회를 해 있는거겠지 그러니까 그 다음에도 있어야해?
        List<QuizGame> quizList = quizGameRepository.findQuizGamesByTemplateId(templateId);
        List<TemplateInfoResponse> quizs = new ArrayList<>();
        for (QuizGame a : quizList) {
            TemplateInfoResponse qgr = new TemplateInfoResponse();
            QuizType type = a.getType();
            String quizDumb = new String(a.getQuiz(), "UTF-8");
            String[] quizDummy = quizDumb.split("``");
            switch (a.getType()) {
                case ox:
                    qgr.setId(a.getId());
                    qgr.setQuestion(quizDummy[0]);
                    qgr.setQuizUrl(quizDummy[1]);
                    qgr.setAnswer(quizDummy[2]);
                    break;
                case text:
                    String[] asList = quizDummy[3].split("₩₩");
                    qgr.setQuestion(quizDummy[0]);
                    qgr.setQuizUrl(quizDummy[1]);
                    qgr.setAnswer(quizDummy[2]);
                    qgr.setAnswerList(asList);
                    break;
                case four:
                    qgr.setQuestion(quizDummy[0]);
                    qgr.setQuizUrl(quizDummy[1]);
                    qgr.setOne(quizDummy[2]);
                    qgr.setTwo(quizDummy[3]);
                    qgr.setThree(quizDummy[4]);
                    qgr.setFour(quizDummy[5]);
                    qgr.setAnswer(quizDummy[6]);
                    break;
            }
            qgr.setTimer(a.getTimer());
            if(a.getType().equals(QuizType.game)){
                qgr.setQuizType(QuizType.game);
                qgr.setGame(quizDummy[0]);
            }else {
                qgr.setQuizType(QuizType.quiz);
                qgr.setQuiz(a.getType().toString());
            }
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

    // 구분자는 모두 `` 으로 나눴고 인정답안은 ₩₩ 으로 구분하였다.
    // 아 이거 그냥 json 형태로 키 밸류로 할걸그랬읍니다 다 동근땅근님때문이야
    @Transactional
    public TemplateDetailResponse quizGameCreate(QuizGameCreateRequest qgcr) throws Exception {
        Template temp = templateRepository.findTemplateByIdAndHostId(qgcr.getTemplateId(), qgcr.getHostId()).orElseThrow(() -> new CustomException(CustomExceptionType.TEMPLATE_NOT_FOUND));
        if (quizGameRepository.existsByTemplateId(temp.getId())) {
            quizGameRepository.deleteByTemplateId(temp.getId());
        }  // 기존꺼 삭제하고 만든다.
        List<Integer> numb = qgcr.getNumbering();  // 이 순서로 무한스크롤을 해야하는데 방법을 모르겠음
        String forNumb = "";
        for (int i = 0; i < numb.size(); i++) {
            if (i < numb.size() - 1) {
                forNumb += numb.get(i) + "``";
            } else {
                forNumb += numb.get(i);
            }
        }// 게임 순서를 string 으로 받아서 저장
        temp.setNumbering(forNumb);
        // 템플릿에 게임 순서 저장

        // 퀴즈들을 저장하자.
        List<QGame> qGames = qgcr.getContents();
        for (QGame a : qGames) {
            String game = "";
            if (a.getType().equals(QuizType.quiz)) {
                switch (a.getQuiz()) {  // game or quiz
                    case ox:
                        game += a.getQuestion() + "``" + a.getQuizUrl() + "``" + a.getAnswer();
                        break;
                    case four:
                        game += a.getQuestion() + "``" + a.getQuizUrl() + "``" + a.getOne()
                                + "``" + a.getTwo() + "``" + a.getThree() + "``" + a.getFour()
                                + "``" + a.getAnswer();
                        break;
                    case text:
                        String al = "";
                        for (int i = 0; i < a.getAnswerList().size(); i++) {
                            if (i < a.getAnswerList().size() - 1) {
                                al += a.getAnswerList().get(i) + "₩₩";
                            } else {
                                al += a.getAnswerList().get(i);
                            }
                        }
                        game += a.getQuestion() + "``" + a.getQuizUrl() + "``" + a.getAnswer()
                                + "``" + al;
                        break;
                }
            } else if (a.getType().equals(QuizType.game)) {
                game += a.getGame();
                
            }
            Charset charset = Charset.forName("UTF-8");
            byte[] bytes = game.getBytes(charset);
            if(a.getGame()!= null){
                a.setQuiz(QuizType.game);
            }
            QuizGame qgame = QuizGame.builder()
                    .templateId(temp.getId())
                    .timer(qgcr.getTimer())
                    .quiz(bytes)
                    .type(a.getQuiz())
                    .build();
            quizGameRepository.save(qgame);
        }

        return findTemplateDetail(temp.getId(), temp.getHostId());
    }

}
