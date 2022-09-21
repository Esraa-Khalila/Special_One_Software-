import React, { useState, useEffect } from "react";
import Input from "../../UI/Input";
import { Button } from "../../UI/Button";
import axios from "axios";
import { Form } from "../../UI/Form";
import swal from "sweetalert";
import styles from "./Contract.module.css";

const AddContractForm = () => {
  const [expiry_date, setExpiryDate] = useState("");
  const [subscription_date, setSubscriptionDate] = useState("");
  const [value, setValue] = useState("");
  const [responsible_person, setResponsiblePerson] = useState("");
  const [VIP, setVIP] = useState("");
  const [customer_id, setCustomerId] = useState("");
  const [error, setError] = useState([]);
  const [data, setData] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();

    const contract = {
      expiry_date: expiry_date,
      subscription_date: subscription_date,
      value: value,
      responsible_person: responsible_person,
      VIP: VIP,
      customer_id: customer_id,
    };
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/contract", contract).then((res) => {
      if (res.data.status === 200) {
        swal({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        }).then(function () {
          window.location.href = "/";
        });

        setError([]);
      } else {
        setError(res.data.validateError);
        swal({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        console.log(res.data.validateError);
      }
    });
    setExpiryDate("");
    setSubscriptionDate("");
    setValue("");
    setResponsiblePerson("");
    setVIP("");
  };

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/customer");
      const getdata = await res.json();
      setData(getdata);
      console.log(getdata);
    };
    getData();
  }, []);
  return (
    <Form
      legend={"Contract"}
      onSubmit={handleSubmit}
      method="post"
      headText={"Add Contract"}
    >
      <Input
        type="date"
        value={expiry_date}
        placeholder="Product Name"
        label="Expiry date"
        name="expiry_date"
        onChange={(e) => setExpiryDate(e.target.value)}
      />
      <span className="text__danger">{error.expiry_date}</span>
      <Input
        type="date"
        value={subscription_date}
        label="Start date"
        name="subscription_date"
        onChange={(e) => setSubscriptionDate(e.target.value)}
      />
      <span className="text__danger">{error.subscription_date}</span>
      <Input
        type="number"
        value={value}
        placeholder="value"
        label="Value"
        name="value"
        onChange={(e) => setValue(e.target.value)}
      />
      <span className="text__danger">{error.value}</span>
      <Input
        type="text"
        value={responsible_person}
        placeholder="Person"
        label="responsible person"
        name="responsible_person"
        onChange={(e) => setResponsiblePerson(e.target.value)}
      />
      <span className="text__danger">{error.responsible_person}</span>

      <div className={styles.input_vip}>
        <p>Select if this customer Vip or Not :</p>
        <label for="contactChoice1">Yes</label>
        <input
          type="radio"
          value={1}
          placeholder="VIP"
          id="VIP"
          name="VIP"
          onChange={(e) => setVIP(e.target.value)}
        />
        <label for="contactChoice1">No</label>
        <input
          type="radio"
          value={0}
          placeholder="VIP"
          id="VIP"
          name="VIP"
          onChange={(e) => setVIP(e.target.value)}
        />
      </div>
      <div className={styles.select_customer}>
        <lable>Customer name</lable>
        <select
          className={styles.form__control}
          name="customer_id"
          onChange={(e) => setCustomerId(e.target.value)}
        >
          {data.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.customer_name}
              </option>
            );
          })}
        </select>
      </div>
      <Button styles={"btn__primary"} type="submit">
        Add
      </Button>
      <Button styles={"btn__secondary"}>Cancel</Button>
    </Form>
  );
};

export default AddContractForm;
