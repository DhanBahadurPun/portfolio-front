import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";

import StockList from "./components/StockList";
import Header from "./components/UI/Header";
import Dashboard from "./components/Dashborad";
import ProfitLoss from "./components/ProfitLoss";
import AddStock from "./components/AddStock";

function App() {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/stock-list" element={<StockList />} />
        <Route path="/profit-loss" element={<ProfitLoss />} />
        <Route path="/add" element={<AddStock />} />
      </Routes>
    </Fragment>
  );
}

export default App;
