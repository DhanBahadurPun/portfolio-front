import axios from "axios";
import { useEffect, useState } from "react";

import classes from "./table.module.css";

const API = "http://127.0.0.1:4000/api/v1";

function Dashboard() {
  const [getAllDetails, setGetAllDetails] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${API}/all-details`);
      const buyData = await response.data;
      setGetAllDetails(buyData);
    })();
  }, []);

  if (getAllDetails.length > 0) {
    const {
      totalUnit,
      totalInvestment,
      totalSellCost,
      currentAmount,
      overalProfit,
    } = getAllDetails[0];
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
            <td>Total Units: {totalUnit} </td>
            <td>Total Investment: {totalInvestment} </td>
          </tr>
          <tr>
            <td>Sold Amount: {totalSellCost} </td>
            <td>Current Amount: {currentAmount} </td>
          </tr>
          <tr>
            <td>Over all Profit: {overalProfit} </td>
          </tr>
        </tbody>
      </table>
    );
  } else {
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
  }
}

export default Dashboard;
