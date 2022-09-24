import axios from "axios";
import { Fragment, useEffect, useState } from "react";

import classes from "./table.module.css";

const API = "http://127.0.0.1:4000/api/v1";

function ProfitLoss() {
  const [stocksDetails, setStocksDetails] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${API}/details`);
      const stocks = await response.data;
      setStocksDetails(stocks);
    })();
  }, []);

  // const mergeDetails = buyStockList.map((buy) => {
  //   return Object.assign(
  //     {
  //       totalSellQuantity: { $numberDecimal: "0" },
  //       totalSold: { $numberDecimal: "0" },
  //     },
  //     buy,
  //     sellStockList.find((sell) => {
  //       return buy.name === sell.name;
  //     })
  //   );
  // });

  if (stocksDetails.length > 0)
    var stockList = stocksDetails.map((list) => {
      return (
        <table key={list.name} className={classes["table"]}>
          <thead className={classes["table-head"]}>
            <tr>
              <th>{list.name}</th>
              <th></th>
            </tr>
          </thead>
          <tbody className={classes["table-body"]}>
            <tr>
              <td>Total Units: {list.totalUnit}</td>
              <td>Total Investment: {list.totalInvestment}</td>
            </tr>
            <tr>
              <td>Sold Amount: {list.totalSellCost} </td>
              <td>Current Amount: {list.currentAmount}</td>
            </tr>
            <tr>
              <td>Over all Profit: {list.overalProfit} </td>
            </tr>
          </tbody>
        </table>
      );
    });
  else
    return (
      <p
        style={{
          textAlign: "center",
          marginTop: 20,
          fontSize: "20px",
          fontWeight: 700,
        }}
      >
        No Records
      </p>
    );

  return <Fragment>{stockList}</Fragment>;
}

export default ProfitLoss;
