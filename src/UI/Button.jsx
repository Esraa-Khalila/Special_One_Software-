import React from "react";
import "./Button.css";

export const Button = (props) => {
  return (
    <button
      className={"btn " + props.styles}
      onClick={props.onClick}
      type={props.type || "button"}
    >
      {props.children}
    </button>
  );
};
