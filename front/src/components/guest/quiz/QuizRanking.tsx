import React from 'react';
import styles from './QuizRanking.module.css'
import crwon from './../../../assets/images/pngwing.png'
const QuizRanking = () => {
    const setList = [1,3,4,5,2];
    return (
        <div className={styles.QuizRanking}> 
            <section className={styles.rank_box}>
                <header className={styles.title}>
                    <div className={styles.title_text}>게임랭킹</div>
                </header>

                <main className={styles.crown}>
                    <img src={crwon} alt='crown' className={styles.crown_img}/>
                </main>


                <footer  className={styles.ranking}>
                    <ul className={styles.ranking_list}>
                        <li className={styles.ranking_item}>
                            <div>1</div>

                            <div>1</div>
                            <div>1</div>
                            <div>1</div>



                        </li>
                    </ul>


                </footer>




            </section>
        </div>
    );
};

export default QuizRanking;