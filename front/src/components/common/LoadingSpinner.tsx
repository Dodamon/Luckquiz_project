import React from "react";
import styles from "./LoadingSpinner.module.css";
import { ColorRing } from "react-loader-spinner";

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.loadingSpinnerContainer}>
      <ColorRing
        visible={true}
        height="200"
        width="200"
        ariaLabel="loading-spinner"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
      <div className={styles.waitTxt}>
        잠시만 기다려 주세요
      </div>
    </div>
  );
};

export default LoadingSpinner;
