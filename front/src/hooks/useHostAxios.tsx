import { useCallback, useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";

// axios 보내고 401 뜨면 logout
// 간단하게 get / post / push 하는데서만 사용할 수 있음
// 복잡하게 데이터 변경해야하고 이런데서는 (아직 안함) 참고
const useHostAxios = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<any>();
  const [status, setStatus] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);

  const authHeader = () => {
    return {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json"
    };
  }

  //  axios 함수
  const sendHostRequest = useCallback(async (requestConfig: any) => {
    setIsLoading(true);
    try {
      const response = await axios(`${process.env.REACT_APP_HOST}${requestConfig.url}`, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : authHeader(),
        data: requestConfig.data && JSON.stringify(requestConfig.data),
        params: requestConfig.params,
      
        // status 받는 경우 -> status + 401
        // status 안받는 경우 -> api 명세 보고 고쳐야할듯
        validateStatus: (status) => {
          if (requestConfig.validateStatus) {
            return (
              requestConfig.validatedateStatus.includes(status) ||
              status === 401
            );
          } else {
            return status === 200 || status === 201 || status === 202 || status === 401;
          }
        }
      });
      // 1. unauthorized 401 (access 만료)
      if (response.status === 401) {
        // logout
        sessionStorage.clear();
        navigate('/')
      }

      // 2. validate Status인 경우
      else {
        setData(response.data);
        setStatus(response.status);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {setStatus(err.response.status)}
    }
    setIsLoading(false);
  }, []);
  return { data, status, isLoading, sendHostRequest };

}

export default useHostAxios;
