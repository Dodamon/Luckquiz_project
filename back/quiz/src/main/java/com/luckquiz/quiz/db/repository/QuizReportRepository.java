package com.luckquiz.quiz.db.repository;

import com.luckquiz.quiz.db.entity.QuizReport;
import com.luckquiz.quiz.db.entity.QuizRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuizReportRepository extends JpaRepository<QuizReport, Integer> {
    @Override
    Optional<QuizReport> findById(Integer integer);
    Optional<QuizReport> findQuizReportByPinNum(Integer pinNum);
    Optional<QuizReport> findByQuizRoom(QuizRoom quizRoom);

    // 이거 api 짜면서 그 때 그 때 맹그시지요... 역시 알 톡 챗 켓 텍 카 노 리 갑자기 저도 안됩니다?
    // 좋읍니다.. 기본적인것만 해뒀읍니다.아놔 임포트 왤캐 안돼
    // find 씀돠 저는..... get은 안써봤는디
    // 알아보겠음돠 그래요? 아예 rsocket import 해서 프론트에서도 쓰는 것 같던디... 챗지피티피셜
    // rsocket은 잘 모르겠네용
    // 근데 find씁니까 get씁니까부리 좋읍니다... 좋읍니다...
    // 이제 Rsocket?? 근데 Rsocket말고 Webflux인가 뭐시기를 Websockt에 적용하는거 같던데
    // 자료가 거의 없읍니다... 방식도 무슨 방식인지.. 아직 잘 모르겠읍니다...
    // socket.io는 room이라고 만들어서 그 room에 있는 모든 사람에게 메시지 전달 가능
    // Stomp는 subscribe 한곳에 모든 사람 메시지 전달 가능
    // Rsocket 은 ?????
    // 바보 려환님입니다.
    // 아놔 이사람들 코드는 안짜고 여기다가 채팅창을 만들어놨어............ 이건
    // 패트와 매트도 아닙니다 이건 그냥 패드 한명이야 이거... 고소할거야 개발자 2명구했는데...
}
