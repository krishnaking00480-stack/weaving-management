import { useState } from "react";
import api from "../services/api";

import SearchBar from "../components/loom/SearchBar";
import LoomTable from "../components/loom/LoomTable";
import LoomForm from "../components/loom/LoomForm";

function Looms() {
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedLoom, setSelectedLoom] = useState(null);
  const [search, setSearch] = useState("");

  // Add / Update Success
  const handleLoomAdded = () => {
    setShowForm(false);
    setSelectedLoom(null);
    setRefresh((prev) => !prev);

    alert("✅ Saved Successfully");
  };

  // Delete Loom
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this loom?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/looms/${id}`);

      alert("✅ Loom Deleted Successfully");

      setRefresh((prev) => !prev);
    } catch (error) {
      console.error(error);

      alert("❌ Failed to Delete Loom");
    }
  };

  return (
    <div className="p-8 bg-slate-100 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold text-blue-700">
          Loom Management
        </h1>

        <button
          onClick={() => {
            setSelectedLoom(null);
            setShowForm(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow"
        >
          + Add Loom
        </button>

      </div>

      {/* Search */}
      <div className="mb-6">
        <SearchBar
          search={search}
          setSearch={setSearch}
        />
      </div>

      {/* Table */}
      <LoomTable
        refresh={refresh}
        search={search}
        onEdit={(loom) => {
          setSelectedLoom(loom);
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />

      {/* Popup */}
      {showForm && (
        <LoomForm
          loom={selectedLoom}
          onClose={() => {
            setShowForm(false);
            setSelectedLoom(null);
          }}
          onSuccess={handleLoomAdded}
        />
      )}

    </div>
  );
}

export default Looms;