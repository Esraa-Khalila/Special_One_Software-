import React, { useState, useEffect } from "react";
import Table from "../UI/Table";
import Title from "../UI/Title";
import useFetch from "./Hooks/useFetch";
import axios from "axios";
import Input from "../UI/Input";
import { Button } from "../UI/Button";

const Home = () => {
  const [searche, setSearch] = useState("");
  const { response, loading } = useFetch({
    method: "get",
    url: "/all",
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
      .get(`http://127.0.0.1:8000/api/all/${searche}`)
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
    { heading: "customer name", value: "customer_name" },
    { heading: "company name", value: "company_name" },
    { heading: "trade name", value: "trade_name" },
    { heading: "ref_number", value: "ref_number" },
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
export default Home;
