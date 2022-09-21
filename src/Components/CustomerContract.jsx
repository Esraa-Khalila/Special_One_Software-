import React, { useState, useEffect } from "react";
import Table from "../../UI/Table";
import Title from "../../UI/Title";
import useFetch from "../Hooks/useFetch";
import axios from "axios";
import Input from "../../UI/Input";
import { Button } from "../../UI/Button";

const ContractItem = () => {
  const [searche, setSearch] = useState("");
  const [datetime, setDate] = useState();
  const { response, loading, error } = useFetch({
    method: "get",
    url: "/contract",
    headers: JSON.stringify({ accept: "*/*" }),
  });
  const [data, setData] = useState([]);
  useEffect(() => {
    if (response !== null) {
      setData(response);
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
  const Handler = () => {
    if (data.expiry_date) {
      console.log(data.expiry_date);
    }
  };

  const column = [
    { heading: "expiry date", value: "expiry_date" },
    { heading: "subscription date", value: "subscription_date" },
    { heading: "responsible person", value: "responsible_person" },
    { heading: "value", value: "value" },
    { heading: "VIP", value: "VIP" },
    { heading: "status", value: "status" },
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
      <h1>{datetime}</h1>
    </React.Fragment>
  );
};

export default CustomerContract;
