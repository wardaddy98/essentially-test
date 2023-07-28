import React, { useState } from "react";
import styles from "./inputSection.module.scss";

const InputSection = ({ fetchStockData }) => {
  const initialFormValues = {
    stockSymbol: "",
    date: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!formValues.date || !formValues.stockSymbol) return;

    try {
      fetchStockData(formValues);
    } catch (err) {
      console.log(err)
    }
  };
  return (
    <div className={styles.wrapper}>
      <span>Enter the following details to get stock information</span>
      <form onSubmit={handleSubmit}>
        <div className={styles.form_item}>
          <label htmlFor="stockSymbol">Stock Symbol</label>
          <input
            type="text"
            onChange={handleChange}
            name="stockSymbol"
            value={formValues.stockSymbol}
          />
        </div>

        <div className={styles.form_item}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            onChange={handleChange}
            name="date"
            value={formValues.date}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InputSection;
