import { Outlet } from "react-router-dom";
import styles from "./GuestQuiz.module.css";
import { useEffect } from "react";

const GuestQuiz = () => {

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = ""; // Chrome에서는 이 설정이 필요합니다.
    };

    const handlePopstate = (event: PopStateEvent) => {
      const shouldLeaveGame = window.confirm("게임에서 나가시겠습니까?");
      if (shouldLeaveGame) {
        // 게임을 나가는 로직을 여기에 추가하세요.
        // 예를 들어, 게임 상태를 초기화하거나 서버에 나가는 요청을 보낼 수 있습니다.
        // ...

        // 페이지를 벗어납니다.
        
      } else {
        // 뒤로가기 동작을 취소합니다.
        window.history.pushState(null, "", window.location.pathname);
      }
    };

    // 브라우저 닫기 이벤트 처리
    window.addEventListener("beforeunload", handleBeforeUnload);

    // 뒤로가기 버튼 이벤트 처리
    window.addEventListener("popstate", handlePopstate);

    return () => {
      // 이벤트 리스너를 정리합니다.
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);
  return (
    <div className={styles.guestQuizContainer}>
      <Outlet></Outlet>
    </div>
  );
};

export default GuestQuiz;
