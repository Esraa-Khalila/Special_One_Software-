import React from "react";
import styles from "./Input.module.css";

const Input = ({ value, label, name, placeholder, type, onChange }) => (
  <div className={styles.form__group}>
    {label && <label htmlFor="input-field">{label} </label>}
    <input
      type={type}
      value={value}
      name={name}
      className={styles.form__control}
      placeholder={placeholder}
      onChange={onChange}
      multiple={true}
    />
  </div>
);

export default Input;
