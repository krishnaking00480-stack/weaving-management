import { useState, useEffect } from "react";
import api from "../../services/api";

function LoomForm({ loom: selectedLoom, onClose, onSuccess }) {
  const initialState = {
    loomId: "",
    weaverName: "",
    sareeType: "",
    ariCount: "",
    status: "Running",
    startDate: "",
    expectedDate: "",
    notes: "",
  };

  const [loom, setLoom] = useState(initialState);

  useEffect(() => {
    if (selectedLoom) {
      setLoom({
        loomId: selectedLoom.loomId,
        weaverName: selectedLoom.weaverName,
        sareeType: selectedLoom.sareeType,
        ariCount: selectedLoom.ariCount,
        status: selectedLoom.status,
        startDate: selectedLoom.startDate
          ? selectedLoom.startDate.split("T")[0]
          : "",
        expectedDate: selectedLoom.expectedDate
          ? selectedLoom.expectedDate.split("T")[0]
          : "",
        notes: selectedLoom.notes || "",
      });
    } else {
      setLoom(initialState);
    }
  }, [selectedLoom]);

  const handleChange = (e) => {
    setLoom({
      ...loom,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     if (selectedLoom) {

    await api.put(`/looms/${selectedLoom._id}`, loom);

} else {

    await api.post("/looms", loom);

}

// Refresh parent table
onSuccess();

// Close popup
onClose();

    } catch (error) {
      console.error(error);
      alert("❌ Failed to save loom");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-[650px] p-8">

        <h2 className="text-2xl font-bold text-blue-600 mb-6">
          {selectedLoom ? "Edit Loom" : "Add New Loom"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-5"
        >

          <div>
            <label className="font-semibold">Loom ID</label>

            <input
              type="text"
              name="loomId"
              value={loom.loomId}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
              required
            />
          </div>

          <div>
            <label className="font-semibold">Weaver Name</label>

            <input
              type="text"
              name="weaverName"
              value={loom.weaverName}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
              required
            />
          </div>

          <div>
            <label className="font-semibold">Saree Type</label>

            <input
              type="text"
              name="sareeType"
              value={loom.sareeType}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
              required
            />
          </div>

          <div>
            <label className="font-semibold">Ari Count</label>

            <input
              type="number"
              name="ariCount"
              value={loom.ariCount}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
              required
            />
          </div>

          <div>
            <label className="font-semibold">Production Status</label>

            <select
              name="status"
              value={loom.status}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            >
              <option value="Running">Running</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Start Date</label>

            <input
              type="date"
              name="startDate"
              value={loom.startDate}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              Expected Completion Date
            </label>

            <input
              type="date"
              name="expectedDate"
              value={loom.expectedDate}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div className="col-span-2">
            <label className="font-semibold">Notes</label>

            <textarea
              rows="4"
              name="notes"
              value={loom.notes}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div className="col-span-2 flex justify-end gap-4">

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              {selectedLoom ? "Update Loom" : "Save Loom"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default LoomForm;