import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import Looms from "./pages/Looms";
import Weavers from "./pages/Weavers";
import Materials from "./pages/Materials";
import Purchases from "./pages/Purchases";
import Production from "./pages/Production";
import Sales from "./pages/Sales";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/looms" element={<Looms />} />

        <Route path="/weavers" element={<Weavers />} />

        <Route path="/materials" element={<Materials />} />

        <Route path="/purchases" element={<Purchases />} />

        <Route path="/productions" element={<Production />} />

        <Route path="/sales" element={<Sales />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;