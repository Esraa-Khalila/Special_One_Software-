import React, { useEffect, useState } from "react";
import styles from "./Table.module.css";

const Table = ({ data, column }, props) => {
  const [hasExpiry, setHasExpiry] = useState(false);
  useEffect(() => {
    const test = () => {
      column.forEach((element) => {
        if (element.heading === "expiry date") {
          setHasExpiry(true);
        }
      });
    };
    test();
  }, []);
  return (
    <div className={hasExpiry ? styles.table__custome : ""}>
      <table border="1" className={styles.table}>
        <thead>
          <tr>
            {column.map((item, index) => (
              <TableHeadItem item={item} key={index} />
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <TableRow key={index} item={item} column={column} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableHeadItem = ({ item }) => <th>{item.heading}</th>;
const TableRow = ({ item, column }) => (
  <tr className={styles[item.isExpired]}>
    {column.map((columnItem, index) => {
      if (columnItem.value.includes(".")) {
        const itemSplit = columnItem.value.split("."); //['address', 'city']
        return <td>{item[itemSplit[0]][itemSplit[1]]}</td>;
      }

      return <td key={index}>{item[`${columnItem.value}`]}</td>;
    })}
  </tr>
);

export default Table;
