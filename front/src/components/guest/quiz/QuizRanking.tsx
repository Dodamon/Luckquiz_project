import React from 'react';
import styles from './QuizRanking.module.css'
import crwon from './../../../assets/images/pngwing.png'
import rank from './../../../assets/images/rank.png'

const QuizRanking = () => {
    const setList = [1,3,4,5,2];
    return (
        <div className={styles.QuizRanking}> 
        
        <div className={styles.rank_logo}>
        
            <div className={styles.logo}>
                <img src={rank} alt="logo"/>
            </div>

        </div>
            <section className={styles.rank_box}>
                <header className={styles.title}>
                    <div className={styles.title_text}>OX 문제</div>
                </header>

                <main className={styles.crown}>
                    <img src={crwon} alt='crown' className={styles.crown_img}/>
                </main>


                <footer  className={styles.ranking}>
                    <ul className={styles.ranking_list}>
                

                 

                        <li className={styles.ranking_item}>
                            <div className={styles.item_left}>
                            <div className={styles.item_num}>1</div>
                            <div className={styles.item_img}>
                                <img src={crwon} alt="img" className={styles.user_img} />
                            </div>
                            <div className={styles.item_name}>나정원철이다</div>
                            </div>

                            <div className={styles.item_right}>
                            <div className={styles.item_score}>2230</div>
                            </div>
                         
                        </li>

                        <li className={styles.ranking_item}>
                            <div className={styles.item_left}>
                            <div className={styles.item_num}>2</div>
                            <div className={styles.item_img}>
                                <img src={crwon} alt="img" className={styles.user_img} />
                            </div>
                            <div className={styles.item_name}>나정원철이다</div>
                            </div>

                            <div className={styles.item_right}>
                            <div className={styles.item_score}>2230</div>
                            </div>
                         
                        </li>

                        <li className={styles.ranking_item}>
                            <div className={styles.item_left}>
                            <div className={styles.item_num}>2</div>
                            <div className={styles.item_img}>
                                <img src={crwon} alt="img" className={styles.user_img} />
                            </div>
                            <div className={styles.item_name}>나정원철이다</div>
                            </div>

                            <div className={styles.item_right}>
                            <div className={styles.item_score}>2230</div>
                            </div>
                         
                        </li>

                        <li className={styles.ranking_item}>
                            <div className={styles.item_left}>
                            <div className={styles.item_num}>2</div>
                            <div className={styles.item_img}>
                                <img src={crwon} alt="img" className={styles.user_img} />
                            </div>
                            <div className={styles.item_name}>나정원철이다</div>
                            </div>

                            <div className={styles.item_right}>
                            <div className={styles.item_score}>2230</div>
                            </div>
                         
                        </li>

                        <li className={styles.ranking_item}>
                            <div className={styles.item_left}>
                            <div className={styles.item_num}>3</div>
                            <div className={styles.item_img}>
                                <img src={crwon} alt="img" className={styles.user_img} />
                            </div>
                            <div className={styles.item_name}>나정원철이다</div>
                            </div>

                            <div className={styles.item_right}>
                            <div className={styles.item_score}>2230</div>
                            </div>
                         
                        </li>
                    </ul>


                </footer>




            </section>
        </div>
    );
};

export default QuizRanking;