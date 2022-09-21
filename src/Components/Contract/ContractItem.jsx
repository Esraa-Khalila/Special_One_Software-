import React, { useState, useEffect } from "react";
import Table from "../../UI/Table";
import Title from "../../UI/Title";
import useFetch from "../Hooks/useFetch";
import axios from "axios";
import Input from "../../UI/Input";
import { Button } from "../../UI/Button";

const ContractItem = () => {
  const [searche, setSearch] = useState("");
  
  const { response, loading, error } = useFetch({
    method: "get",
    url: "/contract",
    headers: JSON.stringify({ accept: "*/*" }),
  });
  const [data, setData] = useState([]);
  useEffect(() => {
    if (response !== null) {
      let newData = response;
     const t = new Date();
     const date = ("0" + t.getDate()).slice(-2);
     const month = ("0" + (t.getMonth() + 1)).slice(-2);
     const year = t.getFullYear();

     const time = `${year}${month}${date}`;
     const test= newData.map(element => {
       if (Number(element.expiry_date.replaceAll('-', '')) - Number(time) >30) {
          
           return {...element,isExpired:'green',status:'good'}
        } else if (
          Number(element.expiry_date.replaceAll("-", "")) - Number(time) >
          0
        ) {
          return { ...element, isExpired: 'yellow' };
       } else {
         return { ...element, isExpired: "red" };
        }
    
      });
      setData(test);
      console.log(test);
    }
  }, [response]);
  const onChangeSearch = (e) => {
    const searche = e.target.value;
    setSearch(searche);
  };
  const findBy = () => {
    axios
      .get(`http://127.0.0.1:8000/api/search/${searche}`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const column = [
    { heading: "expiry date", value: "expiry_date" },
    { heading: "subscription date", value: "subscription_date" },
    { heading: "responsible person", value: "responsible_person" },
    { heading: "value", value: "value" },
    { heading: "VIP", value: "VIP" },
    { heading: "contract_period", value: "contract_period" },
  ];

  return (
    <React.Fragment>
      <Input
        type="text"
        placeholder="Search by"
        value={searche}
        onChange={onChangeSearch}
      />
      <div>
        <Button styles={"btn__search"} type="button" onClick={findBy}>
          Search
        </Button>
      </div>
      <Title headText={"Contract Table"} />

      {loading ? <p>loading...</p> : <Table data={data} column={column} />}
    </React.Fragment>
  );
};

export default ContractItem;
