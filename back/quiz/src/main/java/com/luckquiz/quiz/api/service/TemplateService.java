package com.luckquiz.quiz.api.service;

import com.google.gson.Gson;
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
import lombok.extern.slf4j.Slf4j;
import org.apache.el.util.ReflectionUtil;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ReflectionUtils;
import org.springframework.util.StringUtils;

import java.lang.reflect.Field;
import java.nio.charset.Charset;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
// 템플랫 생성, 조회, 다수조회, 퀴즈추가
public class TemplateService {
    private final TemplateRepository templateRepository;

    private final QuizGameRepository quizGameRepository;
    private final Gson gson;

    @Transactional
    public int createTemplate(TemplateCreateRequest tcr) {
        Template temp = Template.builder()
                .hostId(tcr.getHostId())
                .date(LocalDateTime.now())
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

    public TemplateDetailResponse findTemplateDetail(int templateId, UUID hostId) throws Exception {
        Template template = templateRepository.findTemplateByIdAndHostId(templateId, hostId).orElseThrow(() -> new CustomException(CustomExceptionType.TEMPLATE_NOT_FOUND));
        // template 을 조회를 해 있는거겠지 그러니까 그 다음에도 있어야해?
        List<QuizGame> quizList = quizGameRepository.findQuizGamesByTemplateId(templateId);
        List<QGame> quizgame = new ArrayList<>();
        for (QuizGame a : quizList) {
            String quizDumb = new String(a.getQuiz(), "UTF-8");
            QGame gameinfo = gson.fromJson(quizDumb, QGame.class);
            gameinfo.setId(a.getId());
            gameinfo.setIsValid(a.getIsValid());
            quizgame.add(gameinfo);
        }
        TemplateDetailResponse result = TemplateDetailResponse.builder()
                .id(template.getId())
                .hostId(template.getHostId())
                .name(template.getName())
                .quizList(quizgame)
                .build();

        return result;
    }

    // 구분자는 모두 `` 으로 나눴고 인정답안은 ₩₩ 으로 구분하였다.
    // 아 이거 그냥 json 형태로 키 밸류로 할걸그랬읍니다 다 동근땅근님때문이야
    @Transactional
    public TemplateDetailResponse quizGameCreate(QuizGameCreateRequest qgcr) throws Exception, CustomException {
        Template temp = templateRepository.findTemplateByIdAndHostId(qgcr.getTemplateId(), qgcr.getHostId()).orElseThrow(() -> new CustomException(CustomExceptionType.TEMPLATE_NOT_FOUND));
        temp.setDate(LocalDateTime.now());
        QuizGameCreateRequest newQg = checkValid(qgcr,temp);
        if (quizGameRepository.existsByTemplateId(temp.getId())) {
            quizGameRepository.deleteByTemplateId(temp.getId());
        }  // 기존꺼 삭제하고 만든다.
        // 퀴즈들을 저장하자.

        List<QGame> qGames = newQg.getQuizList();
        for (QGame a : qGames) {
            Charset charset = Charset.forName("UTF-8");
            byte[] bytes = gson.toJson(a).getBytes(charset);
            QuizGame qgame = QuizGame.builder()
                    .templateId(temp.getId())
                    .timer(newQg.getTimer())
                    .quiz(bytes)
                    .isValid(a.getIsValid())
                    .type(a.getType())
                    .build();
            if (QuizType.game.equals(a.getType())) {
                qgame.setType(QuizType.game);
            }
            quizGameRepository.save(qgame);

        }


        return findTemplateDetail(temp.getId(), temp.getHostId());
    }

    public List<TemplateListResponse> templateList(UUID hostId) {
        List<Template> before = templateRepository.findAllByHostId(hostId);
        List<TemplateListResponse> result = new ArrayList<>();
        for (Template a : before) {
            String date = "";
            System.out.println(a.getDate());
            if (a.getDate() != null) {
                date = a.getDate().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
            }
            TemplateListResponse temp = TemplateListResponse.builder()
                    .date(date)
                    .templateId(a.getId())
                    .name(a.getName())
                    .isValid(a.getIsValid())
                    .build();
            result.add(temp);
        }
        return result;
    }

    public QuizGameCreateRequest checkValid(QuizGameCreateRequest quizGameCreateRequest, Template temp) {
        List<QGame> qGames = quizGameCreateRequest.getQuizList();
        List<QGame> result = new ArrayList<>();
        temp.setIsValid("true");
        for (QGame check : qGames) {
            check.setIsValid("true");

            if (QuizType.quiz.equals(check.getType())) {
                switch (check.getQuiz()) {
                    case "ox":
                        if (StringUtils.isEmpty(check.getQuestion())) {
                            check.setIsValid("false");
                            temp.setIsValid("false");
                        } else if (StringUtils.isEmpty(check.getAnswer())) {
                            check.setIsValid("false");
                            temp.setIsValid("false");
                        }
                        break;

                    case "four":
                        if (StringUtils.isEmpty(check.getQuestion())) {
                            check.setIsValid("false");
                            temp.setIsValid("false");
                        } else if (StringUtils.isEmpty(check.getAnswer())) {
                            check.setIsValid("false");
                            temp.setIsValid("false");
                        } else if (StringUtils.isEmpty(check.getOne()) || StringUtils.isEmpty(check.getTwo())
                                || StringUtils.isEmpty(check.getThree()) || StringUtils.isEmpty(check.getFour())) {
                            check.setIsValid("false");
                            temp.setIsValid("false");
                        }
                        break;

                    case "text":
                        if (StringUtils.isEmpty(check.getQuestion())) {
                            check.setIsValid("false");
                            temp.setIsValid("false");
                        } else if (StringUtils.isEmpty(check.getAnswerList())) {
                            check.setIsValid("false");
                            temp.setIsValid("false");
                        }
                        break;
                }
            } else {
                if (StringUtils.isEmpty(check.getGame())) {
                    check.setIsValid("false");
                    temp.setIsValid("false");
                }
                if (check.getGame().equals("emotion")) {
                    if (StringUtils.isEmpty(check.getAnswer())) {
                        check.setIsValid("false");
                        temp.setIsValid("false");
                    }
                }
                break;

            }
            result.add(check);
        }
        quizGameCreateRequest.setQuizList(result);
        return quizGameCreateRequest;
    }


}
