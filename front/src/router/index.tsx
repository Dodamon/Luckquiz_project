import App from "App";
import { createBrowserRouter } from "react-router-dom";

import Nickname from "pages/guest/quiz/Nickname";
import Profile from "pages/guest/quiz/ProfileImage";
import GuestQuiz from "pages/guest/GuestQuiz";
import HomeMain from "pages/host/home/HomeMain";
import Quiz from "pages/host/home/quiz/Quiz";
import Report from "pages/host/home/report/Report";
import HostQuiz from "pages/host/host/HostQuiz";
import QuizCreatePage from "pages/host/quiz/QuizCreatePage";
import ShowPin from "pages/host/host/quiz/ShowPin";
import ReportMain from "pages/host/home/report/ReportMain";
import GuestLobby from "pages/guest/quiz/GuestLobby";
import ReportBasic from "pages/host/home/report/ReportBasic";
import ReportPart from "pages/host/home/report/ReportPart";
import ReportQuiz from "pages/host/home/report/ReportQuiz";
import SocialRedirect from "components/login/SocialRedirect";
import GuestPlayQuiz from "pages/guest/quiz/GuestPlayQuiz";
import BalloonGame from "components/game/balloon/BalloonGame";
import MainLanding from "pages/common/MainLanding";
import HostLobby from "pages/host/host/quiz/HostLobby";
import HostPlayQuiz from "pages/host/host/quiz/HostPlayQuiz";
import QuizRanking from "components/quiz/QuizRanking";
import ErrorPage from "pages/common/ErrorPage";
import EmotionGame from "components/game/emotion/EmotionGame";
import Awards from "pages/common/Awards";
import GuestResult from "pages/guest/quiz/GuestResult";



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
        path: "/*",
        element: <ErrorPage/>,
      },
      {
        path: "quiz/create",
        element: <QuizCreatePage />,
      },
      {
        path: "quiz/rankingwork",
        element: <QuizRanking />,
      },
      {
        path: "quiz/:quiz_id/edit",
        element: <QuizCreatePage />,
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
            element: <HostLobby />,
          },
          {
            path: "play",
            element: <HostPlayQuiz />,
          },
          {
            path: "awards",
            element: <Awards />,
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
            element: <GuestLobby />,
          },
          {
            path: "quiz/emotion",
            element: <EmotionGame handleOrder={() => {}}/>
          },
          {
            path: "quiz/balloon",
            element: <BalloonGame handleOrder={() => {}}/>
          },
          {
            path: "quiz/play",
            element: <GuestPlayQuiz/>,
          },
          {
            path: "quiz/result",
            element: <GuestResult/>,
          },
          {
            path: "quiz/awards",
            element: <Awards />,
          },
          {
            path: "quiz/ranking",
            element: <QuizRanking />,
          },
        ],
      },
      {
        path: "oauth/redirect",
        element: <SocialRedirect />,
      },
    ],
  },
]);

export default router;
