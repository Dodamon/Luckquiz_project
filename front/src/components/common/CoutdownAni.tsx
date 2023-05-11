import styles from "./CoutdownAni.module.css"

interface Props {
  handleOrder : Function
}

const CountdownAni = (props : Props) => {
  const {handleOrder} = props

  // setTimeout(() => {
  //   handleOrder(1);
  // }, 4000);
  
return (
<div className={styles.demo}>
  <div className={styles.blocks}>
    <div className={styles.rotater}>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div className={styles.textInner}></div>
    <div className={styles.textOne}>1</div>
    <div className={styles.textTwo}>2</div>
    <div className={styles.textThree}>3</div>
    <div className={styles.textReady}>Ready</div>
  </div>
  <div className={styles.inner}>
    {/* <svg className={styles.numbers} viewBox="0 0 100 100">
      <defs>
        <path d="M40,28 55,22 55,78"/>
        <path d="M55,78 55,83 a17,17 0 1,0 34,0 a20,10 0 0,0 -20,-10"/>
        <path d="M69,73 l-35,0 l30,-30 a16,16 0 0,0 -22.6,-22.6 l-7,7"/>
        <path d="M28,69 Q25,44 34.4,27.4"/>
        <path d="M30,20 60,20 40,50 a18,15 0 1,1 -12,19"/>
      </defs>
      <path className={styles.numberspath}
            d="M-10,20 60,20 40,50 a18,15 0 1,1 -12,19 
               Q25,44 34.4,27.4
               l7,-7 a16,16 0 0,1 22.6,22.6 l-30,30 l35,0 L69,73 
               a20,10 0 0,1 20,10 a17,17 0 0,1 -34,0 L55,83 
               l0,-61 L40,28" />
    </svg> */}
  </div>
</div>
)
}
export default CountdownAni