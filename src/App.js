import "./App.css";
import SideBar from "./Layout/SideBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerItem from "./Components/Customer/CustomerItem";
import ContractItem from "./Components/Contract/ContractItem";
import AddContractForm from "./Components/Contract/AddContractForm";
import AddCustomerForm from "./Components/Customer/AddCustomerForm ";
import Home from "./Components/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div style={{ width: window.innerWidth > 900 ? "20%" : "" }}>
          <SideBar />
        </div>
        <div style={{ width: window.innerWidth > 900 ? "70%" : "100%" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customer" element={<CustomerItem />} />
            <Route path="/contract" element={<ContractItem />} />
            <Route path="/Add-contract" element={<AddContractForm />} />
            <Route path="/Add-customer" element={<AddCustomerForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
