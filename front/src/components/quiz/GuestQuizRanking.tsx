import styles from "./GuestQuizRanking.module.css";
import rank from "assets/images/rank.png";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { Icon } from "@iconify/react";
import { IMAGES } from "components/guest/ProfileNickname";

const GuestQuizRanking = () => {
  const guestResult = useSelector((state: RootState) => state.socket.getGuestResult);
  const profileImg = useSelector((state: RootState) => state.guest.image);
  return (
    <div className={styles.QuizRanking}>
      <div className={styles.rank_logo}>
        <div className={styles.logos}>
          <img src={rank} alt="logo" />
        </div>
      </div>
      <section className={styles.rank_box}>
        <main className={styles.crown}>
          <img src={IMAGES[profileImg]} alt="crown" className={styles.crown_img} />
        </main>

        <div className={styles.real_rank}>
          <div className={styles.real_num}>{guestResult?.totalRankNow}위</div>
        </div>
        {guestResult && guestResult?.quizNum !== 0 && (
          <div className={styles.diff_box}>
            <div className={styles.diff_updown}>
              {guestResult?.isUp === "true" ? (
                <Icon icon="mdi:arrow-down-bold" color="green" rotate={2} />
              ) : guestResult?.isUp === "false" ? (
                <Icon icon="mdi:arrow-down-bold" color="red" />
              ) : (
                <Icon icon="mdi:menu-swap" color="gray" />
              )}
            </div>
            <div className={styles.diff_number}>{Math.abs(guestResult?.totalRankPre - guestResult?.totalRankNow)}</div>
          </div>
        )}

        <div className={styles.score_box}>
          <div className={styles.score_number}>
            <span>{guestResult?.totalScore}</span>
            <span style={{color:"#a9a9a9", border:"2px "}}>{` (+${guestResult?.scoreGet})`}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GuestQuizRanking;
