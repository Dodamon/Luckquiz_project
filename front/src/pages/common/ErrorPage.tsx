import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import error_400 from "../../assets/images/error_400.png";
import error_401 from "../../assets/images/error_401.png";
import error_403 from "../../assets/images/error_403.png";
import error_404 from "../../assets/images/error_404.png";
import error_405 from "../../assets/images/error_405.png";
import error_502 from "../../assets/images/error_502.png";
import error_etc from "../../assets/images/error_etc.png";
import styles from "./ErrorPage.module.css";

  const ErrorPage: React.FC = () => {
    const location = useLocation();
    const code = location.state?.code;
    const navigate = useNavigate();


    if(code===401){
        sessionStorage.clear();
        navigate("/")
    }
    
    
    return (
        <div className={styles.ErrorPage} >
           <img src={code===404|| code===undefined?error_404: code===401? error_401: code===403? error_403: code===405? error_405: code===400? error_400: code===502? error_502:error_etc } alt="에러" />
        </div>
    );
};

export default ErrorPage;