import React from "react";
import styles from "./displaySection.module.scss";

const DisplaySection = ({stockData}) => {
  return (
    <div className={styles.wrapper}>
      <span>{stockData.stock}</span>

      <div className={styles.details_wrapper}>
        {Object.keys(stockData?.details).map((e, index) => (
          <Detail label={e} value={stockData.details[e]} key={index} />
        ))}
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => {
  return (
    <div className={styles.detail}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
};

export default DisplaySection;
