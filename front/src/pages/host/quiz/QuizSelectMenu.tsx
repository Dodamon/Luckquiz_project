
import styles from "./QuizSelectMenu.module.css"
import { Icon } from '@iconify/react';
const QuizSelectMenu = () => {
    return (
        <nav className={styles.content_nav}>

        <div className={styles.nav_left}>
            <select>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
            </select>
            <select>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
            </select>
        </div>

        <div className={styles.nav_right}>
            <div>
                <div>임시저장</div>
            </div>
            <div>
                <div>저장</div><Icon icon="ic:round-log-out" />
            </div>
        </div>
    </nav>
    );
};

export default QuizSelectMenu;