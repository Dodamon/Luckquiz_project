import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./ConfirmCustom.module.css"

export interface ConfirmProps {
  message: string,
  onConfirm: Function,
  onCancel: Function,
}

// 커스텀 confirm 창 컴포넌트
export const QuizStartConfirm = ({ message, onConfirm, onCancel } : ConfirmProps) => {
  return (
    <div className={styles.container}>
      <span>{message}</span>
      <div className={styles.btnBox}>
      <button className={styles.btnYes} onClick={()=>onConfirm()}>예</button>
      <button className={styles.btnNo} onClick={()=>onCancel()}>아니오</button>
      </div>
    </div>
  );
};

export const TemplateDeleteConfirm  = ({ message, onConfirm, onCancel } : ConfirmProps) => {
  return (
    <div className={styles.container}>
      <span>{message}</span>
      <div className={styles.btnBox}>
      <button className={styles.btnYes2} onClick={()=>onConfirm()}>예</button>
      <button className={styles.btnNo2} onClick={()=>onCancel()}>아니오</button>
      </div>
    </div>
  );
};