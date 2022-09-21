import React, { useState, forwardRef } from "react";
import { Button } from "../../UI/Button";
import Input from "../../UI/Input";
import axios from "axios";
import { Form } from "../../UI/Form";
import swal from "sweetalert";


const AddCustomerForm = () => {
  const [customer_name, setCustomerName] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [trade_name, setTradeName] = useState("");
  const [logo, setLogo] = useState("");
  const [Trade_Register_image, setTradeRegisterImage] = useState("");
  const [images, setImages] = useState("aaa");
  const [error, setError] = useState([]);

  const handleChange = (e) => {
    const imagesArray = [];

    for (let i = 0; i < e.target.files.length; i++) {
      imagesArray.push(e.target.files[i]);
    }
    setImages(imagesArray);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let data = new FormData();
    for (let i = 0; i < images.length; i++) {
      data.append("images[]", images[i]);
    }
    data.append("customer_name", customer_name);
    data.append("company_name", company_name);
    data.append("trade_name", trade_name);
    data.append("logo", logo);
    data.append("Trade_Register_image", Trade_Register_image);

    axios.post("http://localhost:8000/api/customer", data).then((res) => {
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
        swal({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        console.log(res.data.validateError);
        setError(res.data.validateError);
      }
    });
  };

  return (
    <>
      <Form
        headText={"Add customer"}
        encType="multipart/form-data"
        onSubmit={submitHandler}
      >
        <Input
          type="text"
          value={customer_name}
          placeholder="Product Name"
          label="Name"
          name="customer_name"
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <span className="text__danger">{error.customer_name}</span>
        <Input
          type="text"
          value={company_name}
          placeholder="company Name"
          label="company Name"
          name="company_name"
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <span className="text__danger">{error.expiry_date}</span>
        <Input
          type="text"
          value={trade_name}
          placeholder="trade Name"
          label="trade name"
          name="trade_name"
          onChange={(e) => setTradeName(e.target.value)}
        />
        <span className="text__danger">{error.expiry_date}</span>
        <Input
          type="file"
          value={logo}
          label="logo"
          name="logo"
          onChange={(e) => setLogo(e.target.value)}
          id="files"
        />
        <span className="text__danger">{error.expiry_date}</span>
        <Input
          type="file"
          value={Trade_Register_image}
          label="Trade Register image"
          name="Trade_Register_image"
          onChange={(e) => setTradeRegisterImage(e.target.value)}
          id="files"
        />
        <span className="text__danger">{error.expiry_date}</span>
        <Input
          type="file"
          label="contract_image"
          name="images"
          onChange={handleChange}
        />
        <span className="text__danger">{error.expiry_date}</span>
        <Button styles={"btn__primary"} type="submit">
          Add
        </Button>
        <Button styles={"btn__secondary"}>Cancel</Button>
      </Form>
    </>
  );
};

export default AddCustomerForm;
