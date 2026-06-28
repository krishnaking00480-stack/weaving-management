import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import SearchSales from "../components/sales/SearchSales";
import SalesTable from "../components/sales/SalesTable";
import SalesForm from "../components/sales/SalesForm";

import api from "../services/api";

function Sales() {

  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [search, setSearch] = useState("");

  // ==========================
  // Save
  // ==========================
  const handleSalesSaved = () => {
    setShowForm(false);
    setSelectedSale(null);
    setRefresh((prev) => !prev);

    alert("Sales Saved Successfully");
  };

  // ==========================
  // Delete
  // ==========================
  const handleDelete = async (id) => {

    if (!window.confirm("Delete this sales record?"))
      return;

    try {

      await api.delete(`/sales/${id}`);

      alert("Sales Record Deleted");

      setRefresh((prev) => !prev);

    } catch (error) {

      console.error(error);

      alert("Failed to Delete Sales Record");

    }

  };

  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-slate-100 min-h-screen">

        <Navbar />

        <div className="p-6">

          <div className="flex justify-between items-center mb-6">

            <div>

              <h1 className="text-3xl font-bold text-blue-700">
                Sales Management
              </h1>

              <p className="text-gray-500 mt-1">
                Receive sarees from weavers and manage labour payment.
              </p>

            </div>

            <button
              onClick={() => {
                setSelectedSale(null);
                setShowForm(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow"
            >
              + New Sales Entry
            </button>

          </div>

          <SearchSales
            search={search}
            setSearch={setSearch}
          />

          <div className="mt-6">

            <SalesTable
              refresh={refresh}
              search={search}
              onEdit={(sale) => {
                setSelectedSale(sale);
                setShowForm(true);
              }}
              onDelete={handleDelete}
            />

          </div>

        </div>

      </div>

      {showForm && (

        <SalesForm
          sales={selectedSale}
          onClose={() => {
            setShowForm(false);
            setSelectedSale(null);
          }}
          onSuccess={handleSalesSaved}
        />

      )}

    </div>

  );
}

export default Sales;