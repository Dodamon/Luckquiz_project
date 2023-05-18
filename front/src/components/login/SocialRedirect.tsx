import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { authActions } from "store/auth";
import { RootState } from "store";
import useHostAxios from "hooks/useHostAxios";

const SocialRedirect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state.auth);

  const [searchParams, setSearchParams] = useSearchParams();
  const token: string | null = searchParams.get("token");
  const userId: string | null = searchParams.get("id");
  const { data, status, sendHostRequest } = useHostAxios();

  useEffect(() => {
    if (token) {
      dispatch(authActions.login({ token: token }));
      if (token === sessionStorage.getItem("accessToken")) {
        sendHostRequest({
          url: `/api/auth/user/info`,
        });
      } else {
        alert("로그인실패");
        navigate("/");
      }
    } else {
      alert("로그인실패");
      navigate("/");
    }
  }, [searchParams]);

  useEffect(() => {
    if (data) {
      dispatch(authActions.updateInfo({ nickname: data.name, userId: data.id, image_url: data.image_url }));
      navigate("/home");
    }
  }, [data]);

  // useEffect(() => {
  //   // 쿠키에서 access token을 가져오기
  //   const getCookies = () => cookies[0]["access_token"];
  //   const token = getCookies();
  //   // sessionStorage에 accessToken 저장
  //   sessionStorage.setItem("accessToken", token);
  //   setTokenInSessionStorage(sessionStorage.getItem("accessToken"))
  //   //console.log(`4.${sessionStorage.getItem("accessToken")}`)
  //   //console.log(`3.${tokenInSessionStorage}`)

  //   // userInfo조회 요청해서 redux에 저장
  //   axios
  //     .get(`${import.meta.env.VITE_API_BASE_URL}/v1/users/info`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })

  //     .then((response) => {
  //       // 응답이 성공적으로 왔는지 확인하고 유저정보에 isLogin 추가해서 dispatch 요청
  //       if (response?.data.body) {
  //         //console.log(`로그인유저정보 :${response}`);
  //         const userInfo = { ...response.data.body, isLogin: true };
  //         dispatch(userInfoActions.saveUserInfo(userInfo));
  //       } else {
  //         //console.log("유저정보없음");
  //       }
  //     })

  //     .then(() => {
  //       if (survey === "0") {
  //         //console.log
  //         // alert("🍸맞춤추천을 위한 취향설문을 작성해주세요🍹");
  //         navigate("/tasteform");
  //       } else {
  //         // alert("로그인성공");
  //         navigate(`/`);

  //       }
  //     })

  //     .catch((error) => {
  //       //console.log(error);
  //     });
  // }, []);

  return (
    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default SocialRedirect;
