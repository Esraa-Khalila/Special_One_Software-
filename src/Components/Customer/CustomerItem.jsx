import React,{useEffect,useState} from "react";
import Table from "../../UI/Table";
import Title from "../../UI/Title";
import useFetch from "../Hooks/useFetch";
import Input from "../../UI/Input";
import { Button } from "../../UI/Button";
import axios from "axios";

const CustomerItem = () => {
  const [searche, setSearch] = useState("");
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
  const { response, loading, error } = useFetch({
    method: "get",
    url: "/customer",
    headers: JSON.stringify({ accept: "*/*" }),
  });
  const [data, setData] = useState([]);
  useEffect(() => {
    if (response !== null) {
      setData(response);  
    }
  }, [response]);
 const column = [
   { heading: "customer name", value: "customer_name" },
   { heading: "company name", value: "company_name" },
   { heading: "trade name", value: "trade_name" },
   { heading: "ref_number", value: "ref_number" },
 ];

   return (
     <div>
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
       <Title headText={"Customer Table"} />
       {loading ? <p>loading...</p> : <Table data={data} column={column} />}
     </div>
   );
};

export default CustomerItem;
