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
    // if (item.transactionType === "buy")
    return (
      <tr key={`${item.id}`}>
        <td>{index + 1}</td>
        <td>{item.name}</td>
        <td>{item.transactionType}</td>
        <td>
          {item.transactionType === "buy"
            ? item.buyQuantity
            : item.sellQuantity}
        </td>
        <td>
          {item.transactionType === "buy" ? item.buyAmount : item.sellAmount}
        </td>
        <td>{`${new Date(item.created_at).getFullYear()}/${
          new Date(item.created_at).getMonth() + 1
        }/${new Date(item.created_at).getDate()}`}</td>
      </tr>
    );
  });

  return stocks.length > 0 ? (
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
  ) : (
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
}

export default StockList;
