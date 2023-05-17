import styles from "./QuizRanking.module.css";
import crown from "assets/images/pngwing.png";
import rank from "assets/images/rank.png";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { IMAGES } from "components/guest/ProfileNickname";

const HostGameRanking = () => {
  const quizGameType = useSelector((state: RootState) => state.socket.quizItem);
  const hostResult = useSelector((state: RootState) => state.socket.getHostResult);

  return (
    <div className={styles.QuizRanking}>
      <div className={styles.rank_logo}>
        <div className={styles.logos}>
          <img src={rank} alt="logo" />
        </div>
      </div>
      <section className={styles.rank_box}>
        <main className={styles.crown}>
          <img src={crown} alt="crown" className={styles.crown_img} />
        </main>

        <footer className={styles.ranking}>
          <ul className={styles.ranking_list}>
            {hostResult?.map((it, index) => {
              return (
                <li className={styles.ranking_item} key={index}>
                  <div className={styles.item_left}>
                    <div className={styles.item_num}>{it.rankNow}</div>
                    <div className={styles.item_img}>
                      <img src={IMAGES[it.playerImg]} alt="img" className={styles.user_img} />
                    </div>
                    <div className={styles.item_name}>{it.playerName}</div>
                  </div>

                  <div className={styles.item_right}>
                    <div className={styles.item_score}>{it.scoreGet}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </footer>
      </section>
    </div>
  );
};

export default HostGameRanking;
