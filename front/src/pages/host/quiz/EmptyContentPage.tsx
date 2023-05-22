import React from 'react';
import styles from "./EmptyContentPage.module.css"
import logo from "./../../../assets/images/logo.png"
import { useNavigate } from 'react-router-dom';



const EmptyContentPage = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.EmptyContentPage}>
            <div className={styles.exitbox}>
                <div className={styles.exit_btn} >
                    <div className={styles.btn_comment} onClick={()=>  navigate("/home",{replace: true})}>나가기</div>
                    
                </div>
            </div>

            <div className={styles.emptybox} >
                <div className={styles.logo}><img src={logo} alt="로고" /></div>
                <div className={styles.comment}>  컨텐츠가 없습니다. 퀴즈 혹은 게임을 추가해주세요</div>
            </div>
        </div >
    );
};

export default EmptyContentPage;