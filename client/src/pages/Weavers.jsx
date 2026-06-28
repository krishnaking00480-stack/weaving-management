import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import SearchWeaver from "../components/weaver/SearchWeaver";
import WeaverTable from "../components/weaver/WeaverTable";
import WeaverForm from "../components/weaver/WeaverForm";

import api from "../services/api";
import toast from "react-hot-toast";

function Weavers() {
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedWeaver, setSelectedWeaver] = useState(null);
  const [search, setSearch] = useState("");

  // ==========================
  // Save / Update
  // ==========================
  const handleWeaverSaved = () => {
    setShowForm(false);
    setSelectedWeaver(null);
    setRefresh((prev) => !prev);

    toast.success("Weaver Saved Successfully");
  };

  // ==========================
  // Delete
  // ==========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this weaver?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/weavers/${id}`);

      toast.success("Weaver Deleted Successfully");

      setRefresh((prev) => !prev);
    } catch (error) {
      console.error(error);

      toast.error("Failed to Delete Weaver");
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
              Weaver Management
            </h1>

            <button
              onClick={() => {
                setSelectedWeaver(null);
                setShowForm(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-lg transition"
            >
              + Add Weaver
            </button>
          </div>

          {/* Search */}
          <SearchWeaver
            search={search}
            setSearch={setSearch}
          />

          {/* Table */}
          <div className="mt-6">
            <WeaverTable
              refresh={refresh}
              search={search}
              onEdit={(weaver) => {
                setSelectedWeaver(weaver);
                setShowForm(true);
              }}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>

      {/* Popup */}
      {showForm && (
        <WeaverForm
          weaver={selectedWeaver}
          onClose={() => {
            setShowForm(false);
            setSelectedWeaver(null);
          }}
          onSuccess={handleWeaverSaved}
        />
      )}
    </div>
  );
}

export default Weavers;