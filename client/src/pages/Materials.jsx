import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import SearchMaterial from "../components/material/SearchMaterial";
import MaterialTable from "../components/material/MaterialTable";
import MaterialForm from "../components/material/MaterialForm";

import api from "../services/api";
import toast from "react-hot-toast";

function Materials() {
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [search, setSearch] = useState("");

  // ==========================
  // Save / Update
  // ==========================
  const handleMaterialSaved = () => {
    setShowForm(false);
    setSelectedMaterial(null);
    setRefresh((prev) => !prev);

    toast.success("Material Saved Successfully");
  };

  // ==========================
  // Delete
  // ==========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this material?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/materials/${id}`);

      toast.success("Material Deleted Successfully");

      setRefresh((prev) => !prev);
    } catch (error) {
      console.error(error);

      toast.error("Failed to Delete Material");
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-slate-100 min-h-screen">
        <Navbar />

        <div className="p-6">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">

            <h1 className="text-3xl font-bold text-blue-700">
              Material Management
            </h1>

            <button
              onClick={() => {
                setSelectedMaterial(null);
                setShowForm(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-lg transition"
            >
              + Add Material
            </button>

          </div>

          {/* Search */}
          <SearchMaterial
            search={search}
            setSearch={setSearch}
          />

          {/* Table */}
          <div className="mt-6">
            <MaterialTable
              refresh={refresh}
              search={search}
              onEdit={(material) => {
                setSelectedMaterial(material);
                setShowForm(true);
              }}
              onDelete={handleDelete}
            />
          </div>

        </div>
      </div>

      {/* Popup */}
      {showForm && (
        <MaterialForm
          material={selectedMaterial}
          onClose={() => {
            setShowForm(false);
            setSelectedMaterial(null);
          }}
          onSuccess={handleMaterialSaved}
        />
      )}
    </div>
  );
}

export default Materials;