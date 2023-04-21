import React from 'react';
import styles from "./QuizCreate.module.css"
const QuizCreate = () => {

    const array = ["1", "2", "3"];



    return (
        <div className={styles.QuizCreate}>

            <section className={styles.left_side} >
                <ul className={styles.quiz_list}>
                    {
                        array.map(it=>{
                            return <li>{it}</li>
                        })
                    }

                </ul>
            </section>

            <section className={styles.right_side} >
                우쪽
            </section>






        </div>
    );
};

export default QuizCreate;