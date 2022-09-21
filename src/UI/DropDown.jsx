import { useState } from "react";
import { Icon } from "@iconify/react";
import styles from "./DropDown.module.css";
import { Button } from "./Button";

const Dropdown = (props) => {
  const [open, setOpen] = useState(false);
  const dropdownHandler = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  return (
    <div className={styles.dropdown}>
      <Button styles={"btn__dropdown"} onClick={dropdownHandler}>
        <Icon icon={props.icon} />
        {props.title}
      </Button>
      {open ? <div>{props.children}</div> : ""}
    </div>
  );
};
export default Dropdown;
