import axios from "axios";
import { Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import classes from "./AddStock.module.css";

const API = "http://127.0.0.1:4000/api/v1";

function AddStock() {
  const [name, setName] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  function successToast(message) {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      icon: false,
    });
  }

  function errorToast(message) {
    toast.error(message);
  }

  async function handleSubmint(event) {
    event.preventDefault();
    const data = {
      name,
      transactionType,
      quantity,
      amount,
      transactionDate: new Date(date),
    };

    try {
      await axios.post(API, data);
      successToast("Success!");
    } catch ({ response }) {
      console.log(response);
      errorToast(response.data.message);
    }

    setName("");
    setTransactionType("");
    setQuantity("");
    setAmount("");
    setDate("");
  }

  return (
    <Fragment>
      <section className={classes["add-section"]}>
        <div className={classes["form-container"]}>
          <h1>Fill Details</h1>
          <form onSubmit={handleSubmint}>
            <select
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            >
              <option value="">Choose Stock Name</option>
              <option value="Standard Charter Bank">
                Standard Charter Bank
              </option>
              <option value="Nepal Investment Bank">
                Nepal Investment Bank
              </option>
              <option value="NIC ASIA Bank">NIC ASIA Bank</option>
              <option value="Nabil Bank">Nabil Bank</option>
            </select>
            <select
              value={transactionType}
              onChange={(event) => setTransactionType(event.target.value)}
              required
            >
              <option value="">Transaction Type</option>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
            <input
              type="number"
              placeholder="Quantity"
              onChange={(event) => setQuantity(event.target.value)}
              value={quantity}
              min={1}
              required
            />
            <input
              type="number"
              placeholder="Buy/Sell Price"
              onChange={(event) => setAmount(event.target.value)}
              value={amount}
              min={1}
              required
            />
            <input
              type="date"
              placeholder="Select Date"
              onChange={(event) => setDate(event.target.value)}
              value={date}
              required
            />
            <button className={classes["btn"]}>Submit</button>
          </form>
        </div>
      </section>
      <ToastContainer icon={false} style={{ fontSize: "16px" }} />
    </Fragment>
  );
}

export default AddStock;
