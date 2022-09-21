import styles from "./SiderBar.module.css";
import Dropdown from "../UI/DropDown";
import { useState } from "react";
import { Icon } from "@iconify/react";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const isMobile = () => {
    let innerWidth = window.innerWidth;
    if (innerWidth > 920) {
      return false;
    }
    return true;
  };
  return (
    <div
      className={`${isOpen && isMobile() ? styles.isMobile : ""} ${
        styles.sidebar
      } `}
    >
      {isMobile() ? (
        <div
          className={styles.test}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <Icon icon="cil:hamburger-menu" />
        </div>
      ) : (
        ""
      )}

      <a className={styles.title} href="/">
        Admin
      </a>
      <hr />
      <Dropdown icon={"clarity:users-solid"} title={"Customers"}>
        <a href="/customer">Table</a>
        <a href="/add-customer">Add</a>
      </Dropdown>
      <Dropdown icon={"fa-solid:file-contract"} title={"Contract"}>
        <a href="/contract">Table</a>
        <a href="/add-contract">Add</a>
      </Dropdown>
    </div>
  );
};

export default SideBar;
