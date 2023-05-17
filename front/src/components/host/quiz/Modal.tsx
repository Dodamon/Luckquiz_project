
import { useState } from "react";
import styles from "./Modal.module.css";
import { Icon } from '@iconify/react';
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { quizAtions } from "store/quiz";
import { setQuizSet } from "models/quiz";
type ModalProps = {
    isModal: boolean;
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const Modal = ({ isModal, setIsModal }: ModalProps) => {
    const [isModals, setIsModals] = [isModal, setIsModal];
    const [name, setName] = useState("");


    const authInfo = useSelector((state: RootState) => state.auth.userId)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function onClickClose() {
        setIsModals(false);
        setName("");
    }

    function onClickCreate() {

        if(name.length===0){
            alert("최소 글자수를 맞춰주세요!");
            return;
        }
    
        const template = {
            name: name,
            hostId: authInfo,
        }

        axios.post("https://k8a707.p.ssafy.io/api/quiz/template/regist", template).then(res => {
            setIsModals(false);
            setName("");


            const state: setQuizSet = {
                hostId: authInfo,
                templateId: res.data,
                quizList: []
            }
            dispatch(quizAtions.receiveUpdate(state))
            navigate("/quiz/create");



        }
        )

    }

    const nameChangeHandler = (e: any) => {
        setName(e.target.value);
    }

    return (
        <div className={(isModals) ? styles['modal'] : styles['close']}>
            <section>
                <header className={styles.header_section}>
                    <div className={styles.header_title}>퀴즈 템플릿 만들기</div>

                    <div className={styles.header_btn}>
                        <button onClick={onClickClose}><Icon icon="ph:x-bold" /></button>
                    </div>

                </header>

                <main className={styles.main_section}>

                    <div className={styles.input_name}>TEMPLATE</div>
                    <div className={styles.input_box}><input type="text" maxLength={15} value={name} onChange={e => nameChangeHandler(e)} placeholder="1~15자 이내의 제목을 설정해주세요" /></div>
                </main>

                <div className={styles.footer_section}>
                    <div>
                        <button className={styles['btn-left']} onClick={onClickCreate}>생성</button>
                        <button className={styles['btn-right']} onClick={onClickClose}>닫기</button>
                    </div>
                </div>

            </section>
        </div>
    );
};

export default Modal;
