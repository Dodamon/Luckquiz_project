import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { socketActions } from "store/webSocket";
import { guestActions } from "store/guest";
import { useEffect } from "react";

const QuizLobbyRedirect = () => {
  const { quiz_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(guestActions.updateGuestNickname(""));
    dispatch(socketActions.updatePinNum(quiz_id));
    navigate(`/guest/nickname`);
  }, []);

  return (
    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
export default QuizLobbyRedirect;
