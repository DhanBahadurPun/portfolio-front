import axios from "axios";
import { useEffect, useState } from "react";

import classes from "./table.module.css";

const API = "http://127.0.0.1:4000/api/v1";

function StockList() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(API);
      const data = await response.data;
      setStocks(data);
    })();
  }, []);

  const table_data = stocks.map((item, index) => {
    return (
      <tr key={`${item.id}`}>
        <td>{index + 1}</td>
        <td>{item.name}</td>
        <td>{item.transactionType}</td>
        <td>{item.quantity["$numberDecimal"]}</td>
        <td>{parseFloat(item.ltp["$numberDecimal"]).toFixed(2)}</td>
        <td>{`${new Date(item.transactionDate).getFullYear()}/${
          new Date(item.transactionDate).getMonth() + 1
        }/${new Date(item.transactionDate).getDate()}`}</td>
      </tr>
    );
  });

  return (
    <table className={classes["table"]}>
      <thead className={classes["table-head"]}>
        <tr>
          <th>S.N.</th>
          <th>Name</th>
          <th>Transaction Type</th>
          <th>Quantity</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody className={classes["table-body"]}>{table_data}</tbody>
    </table>
  );
}

export default StockList;
