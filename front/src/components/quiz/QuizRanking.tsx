import React from "react";
import styles from "./QuizRanking.module.css";
import crown from "assets/images/pngwing.png";
import rank from "assets/images/rank.png";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { IMAGES } from "components/guest/ProfileNickname";

// 최종결과 어워즈에 달리는 모달형 랭킹
const QuizRanking = () => {
  const finalResult = useSelector((state: RootState) => state.socket.getFinalResultList);
  
  return (
    <div className={styles.modalBack}>
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
              {finalResult?.map((it, index) => {
                return (
                  <li className={styles.ranking_item} key={index}>
                      <div className={styles.item_num}>{it.rank}</div>
                      <div className={styles.item_img}>
                        <img src={IMAGES[it.img]} alt="img" className={styles.user_img} />
                      </div>
                      <div className={styles.item_name}>{it.sender}</div>
                      <div className={styles.item_score}>{it.score}</div>
                  </li>
                );
              })}
            </ul>
          </footer>
        </section>
      </div>
    </div>
  );
};

export default QuizRanking;
