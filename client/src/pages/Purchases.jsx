import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import SearchPurchase from "../components/purchase/SearchPurchase";
import PurchaseTable from "../components/purchase/PurchaseTable";
import PurchaseForm from "../components/purchase/PurchaseForm";

import api from "../services/api";

function Purchases() {
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [search, setSearch] = useState("");

  // ==========================
  // Save Purchase
  // ==========================
  const handlePurchaseSaved = () => {
    setShowForm(false);
    setSelectedPurchase(null);
    setRefresh((prev) => !prev);

    alert("Purchase Request Saved Successfully");
  };

  // ==========================
  // Delete Purchase
  // ==========================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this purchase request?")) return;

    try {
      await api.delete(`/purchases/${id}`);

      alert("Purchase Request Deleted");

      setRefresh((prev) => !prev);

    } catch (error) {

      console.error(error);

      alert("Failed to Delete Purchase");

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
                Purchase Requests
              </h1>

              <p className="text-gray-500 mt-1">
                Manage material purchase requests for each loom.
              </p>

            </div>

            <button
              onClick={() => {
                setSelectedPurchase(null);
                setShowForm(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow"
            >
              + New Purchase Request
            </button>

          </div>

          <SearchPurchase
            search={search}
            setSearch={setSearch}
          />

          <div className="mt-6">

            <PurchaseTable
              refresh={refresh}
              search={search}
              onEdit={(purchase) => {
                setSelectedPurchase(purchase);
                setShowForm(true);
              }}
              onDelete={handleDelete}
            />

          </div>

        </div>

      </div>

      {showForm && (
        <PurchaseForm
          purchase={selectedPurchase}
          onClose={() => {
            setShowForm(false);
            setSelectedPurchase(null);
          }}
          onSuccess={handlePurchaseSaved}
        />
      )}

    </div>
  );
}

export default Purchases;