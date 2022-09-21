import React from "react";
import styles from "./Form.module.css";
import Title from "./Title";

export const Form = (props) => {
  return (
    <div className={styles.form}>
      <Title headText={props.headText} />
      <form onSubmit={props.onSubmit}>
        <fieldset>
          <legend>{props.legend}</legend>
          {props.children}
        </fieldset>
      </form>
    </div>
  );
};
