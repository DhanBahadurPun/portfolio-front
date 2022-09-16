import axios from "axios";
import { useEffect, useState } from "react";

import classes from "./table.module.css";

const API = "http://127.0.0.1:4000/api/v1";

function Dashboard() {
  const [buy, setBuy] = useState([]);
  const [sell, setSell] = useState([]);

  console.log("buy", buy);
  console.log("sell", sell);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${API}/total-buy`);
      const buyData = await response.data;
      setBuy(buyData);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${API}/total-sell`);
      const sellData = await response.data;
      setSell(sellData);
    })();
  }, []);

  let buyQuantity = 0,
    buyAmount = 0,
    sellQuantity = 0,
    sellAmount = 0;
  let WCC, ltp;

  if (buy.length) {
    buyQuantity = buy[0].buyQuantity["$numberDecimal"];
    buyAmount = buy[0].buyAmount["$numberDecimal"];
    WCC = buy[0].WCC["$numberDecimal"];
    ltp = buy[0].ltp["$numberDecimal"];
  }

  if (sell.length) {
    sellQuantity = sell[0].soldQuantity["$numberDecimal"];
    sellAmount = sell[0].soldAmount["$numberDecimal"];
  }
  return (
    <table className={classes["table"]}>
      <thead className={classes["table-head"]}>
        <tr>
          <th>Dashboard</th>
          <th></th>
        </tr>
      </thead>
      <tbody className={classes["table-body"]}>
        <tr>
          <td>Total Units: {buyQuantity - sellQuantity}</td>
          <td>
            Total Investment: {((buyQuantity - sellQuantity) * WCC).toFixed(2)}
          </td>
        </tr>
        <tr>
          <td>Sold Amount: {sellAmount}</td>
          <td>
            Current Amount: {((buyQuantity - sellQuantity) * ltp).toFixed(2)}
          </td>
        </tr>
        <tr>
          <td>
            Over all Profit:{" "}
            {(
              (buyQuantity - sellQuantity) * ltp -
              (buyQuantity - sellQuantity) * WCC
            ).toFixed(2)}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Dashboard;
