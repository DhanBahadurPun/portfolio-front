import axios from "axios";
import { Fragment, useEffect, useState } from "react";

import classes from "./table.module.css";

const API = "http://127.0.0.1:4000/api/v1";

function ProfitLoss() {
  const [buyStockList, setBuyStockList] = useState([]);
  const [sellStockList, setSellStockList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${API}/buy`);
      const stocks = await response.data;
      setBuyStockList(stocks);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${API}/sell`);
      const stocks = await response.data;
      setSellStockList(stocks);
    })();
  }, []);

  const mergeDetails = buyStockList.map((item1) => {
    return Object.assign(
      {
        totalSellQuantity: { $numberDecimal: "0" },
        totalSold: { $numberDecimal: "0" },
      },
      item1,
      sellStockList.find((item2) => {
        return item1.name === item2.name;
      })
    );
  });

  var stockList =
    mergeDetails &&
    mergeDetails.map((list) => {
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
              <td>
                Total Units:{" "}
                {parseInt(list.totalBuyQuantity["$numberDecimal"]) -
                  parseInt(list.totalSellQuantity["$numberDecimal"])}
              </td>
              <td>
                Total Investment:{" "}
                {`${
                  (parseInt(list.totalBuyQuantity["$numberDecimal"]) -
                    parseInt(list.totalSellQuantity["$numberDecimal"])) *
                  parseInt(list.WCC["$numberDecimal"])
                }`}
              </td>
            </tr>
            <tr>
              <td>Sold Amount: {list.totalSold["$numberDecimal"]} </td>
              <td>
                Current Amount:{" "}
                {`${
                  (parseInt(list.totalBuyQuantity["$numberDecimal"]) -
                    parseInt(list.totalSellQuantity["$numberDecimal"])) *
                  parseInt(list.ltpPrice["$numberDecimal"])
                }`}{" "}
              </td>
            </tr>
            <tr>
              <td>
                Over all Profit:{" "}
                {`${
                  (parseInt(list.totalBuyQuantity["$numberDecimal"]) -
                    parseInt(list.totalSellQuantity["$numberDecimal"])) *
                    parseInt(list.ltpPrice["$numberDecimal"]) -
                  (parseInt(list.totalBuyQuantity["$numberDecimal"]) -
                    parseInt(list.totalSellQuantity["$numberDecimal"])) *
                    parseInt(list.WCC["$numberDecimal"])
                }`}{" "}
              </td>
            </tr>
          </tbody>
        </table>
      );
    });

  if (buyStockList) {
    var buyLists = buyStockList.map((list) => (
      <table key={list.name} className={classes["table"]}>
        <thead className={classes["table-head"]}>
          <tr>
            <th>{list.name}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className={classes["table-body"]}>
          <tr>
            <td>Total Units: {list.totalBuyQuantity["$numberDecimal"]}</td>
            <td>
              Total Investment:{" "}
              {list.totalBuyQuantity["$numberDecimal"] *
                list.WCC["$numberDecimal"]}
            </td>
          </tr>
          <tr>
            <td>Sold Amount: {0} </td>
            <td>
              Current Amount:{" "}
              {list.totalBuyQuantity["$numberDecimal"] *
                list.ltpPrice["$numberDecimal"]}
            </td>
          </tr>
          <tr>
            <td>
              Over all Profit:{" "}
              {`${
                list.totalBuyQuantity["$numberDecimal"] *
                  list.ltpPrice["$numberDecimal"] -
                list.totalBuyQuantity["$numberDecimal"] *
                  list.WCC["$numberDecimal"]
              }`}{" "}
            </td>
          </tr>
        </tbody>
      </table>
    ));
  }

  return (
    <Fragment>
      {buyStockList.length && sellStockList.length ? (
        stockList
      ) : buyStockList.length ? (
        buyLists
      ) : (
        <table className={classes["table"]}>
          <thead className={classes["table-head"]}>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
        </table>
      )}
    </Fragment>
  );
}

export default ProfitLoss;
