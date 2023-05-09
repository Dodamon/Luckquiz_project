
import styles from "./Modal.module.css";
type ModalProps = {
    isModal: boolean;
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  };
const Modal = ( { isModal, setIsModal }: ModalProps) => {
    const [isModals, setIsModals] = [isModal, setIsModal];

    function onClickClose () {
        setIsModals(false);
    }

    function onClickCreate () {

        // ...
        setIsModals(false);
    }
    
    return (
        <div className={(isModals) ? styles['modal'] : styles['close']}>
            <section>
                <header>
                    <div>퀴즈 템플릿 만들기</div>
                    <button onClick={onClickClose}>X</button>
                </header>
                <main>
                    <div>
                        <div>Room Name</div>
                    </div>
                    <div>
                        <div>Member</div>
                        <select disabled></select>
                    </div>
                </main>
                <footer>
                    <button className={styles['btn-left']} onClick={onClickCreate}>Create</button>
                    <button className={styles['btn-right']} onClick={onClickClose}>Close</button>
                </footer>
            </section>
        </div>
    );
};

export default Modal;
