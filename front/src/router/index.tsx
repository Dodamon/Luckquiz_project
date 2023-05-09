import App from "App";
import { createBrowserRouter } from "react-router-dom";

import Nickname from "pages/guest/quiz/Nickname";
import Profile from "pages/guest/quiz/ProfileImage";
import GuestQuiz from "pages/guest/GuestQuiz";
import HomeMain from "pages/host/home/HomeMain";
import Quiz from "pages/host/home/quiz/Quiz";
import Report from "pages/host/home/report/Report";
import HostQuiz from "pages/host/host/HostQuiz";
import Login from "components/login/Login";
import QuizCreatePage from "pages/host/quiz/QuizCreatePage";
import Edit from "pages/host/quiz/Edit";
import ShowPin from "pages/host/host/quiz/ShowPin";
import ReportMain from "pages/host/home/report/ReportMain";
import GuestLobby from "pages/guest/quiz/GuestLobby";
import PlayBalloonGame from "components/game/balloon/PlayBalloonGame";
// import ReadyBalloonGame from "components/game/balloon/ReadyBalloonGame";
import ReportBasic from "pages/host/home/report/ReportBasic";
import ReportPart from "pages/host/home/report/ReportPart";
import ReportQuiz from "pages/host/home/report/ReportQuiz";
import SocialRedirect from "components/login/SocialRedirect";
import ReadyGame from "components/common/ReadyGame";
import EmotionGame from "components/game/emotion/EmotionGame";

import BalloonGame from "components/game/balloon/BalloonGame";
import WakeUpGame from "components/game/wakeup/WakeUpGame";
import MainLanding from "pages/common/MainLanding";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      {
        index: true,
        element: <MainLanding />,
      },
      {
        path: "home",
        element: <HomeMain />,
        children: [
          {
            index: true,
            element: <Quiz />,
          },
          {
            path: "report",
            element: <ReportMain />,
            children: [
              {
                index: true,
                element: <Report />,
              },
              {
                path: ":report_id/basicinfo",
                element: <ReportBasic />,
              },
              {
                path: ":report_id/partinfo",
                element: <ReportPart />,
              },
              {
                path: ":report_id/quizinfo",
                element: <ReportQuiz />,
              },
            ],
          },
        ],
      },
      {
        path: "quiz/create",
        element: <QuizCreatePage/>,
      },
      {
        path: "quiz/:quiz_id/edit",
        element: <Edit />,
      },
      {
        path: "host/quiz/:quiz_id",
        element: <HostQuiz />,
        children: [
          {
            index: true,
            element: <ShowPin />,
          },
          {
            path: "lobby",
            element: <></>,
          },
          {
            path: "play",
            element: <></>,
          },
          {
            path: "awards",
            element: <></>,
          },
        ],
      },
      {
        path: "guest",
        element: <GuestQuiz />,
        children: [
          {
            index: true,
            element: <></>,
          },
          {
            path: "nickname",
            element: <Nickname />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "quiz/lobby",
            element: <GuestLobby/>,
          },
          {
            path: "quiz/play",
            element: <></>,
          },
          {
            path: "quiz/balloon",
            element: <BalloonGame/>,
          },
          {
            path: "quiz/emotion",
            element: <EmotionGame/>,
          },
          {
            // 지워야 됨
            path: "quiz/egg",
            element: <WakeUpGame/>,
          },
          {
            // 지워야 됨
            path: "quiz/game/ready",
            element: <ReadyGame/>
          },
          {
            path: "quiz/result",
            element: <></>,
          },
          {
            path: "quiz/awards",
            element: <></>,
          },
          {
            path: "quiz/ranking",
            element: <></>,
          },
        ],
      },
      {
        path:"oauth/redirect",
        element: <SocialRedirect/>
      }
    ],
  },
]);

export default router;
