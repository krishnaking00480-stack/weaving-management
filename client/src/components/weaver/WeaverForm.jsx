import { useEffect, useState } from "react";
import api from "../../services/api";

function WeaverForm({ weaver, onClose, onSuccess }) {
  const [looms, setLooms] = useState([]);

  const [formData, setFormData] = useState({
    weaverId: "",
    weaverName: "",
    phone: "",
    experience: "",
    assignedLoom: "",
    status: "Active",
    notes: "",
  });

  useEffect(() => {
    fetchLooms();

    if (weaver) {
      setFormData({
        ...weaver,
      });
    }
  }, [weaver]);

  const fetchLooms = async () => {
    try {
      const res = await api.get("/looms");
      setLooms(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (weaver) {
        await api.put(`/weavers/${weaver._id}`, formData);
      } else {
        await api.post("/weavers", formData);
      }

      onSuccess();

    } catch (error) {
      console.error(error);
      alert("Failed to Save Weaver");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white w-[700px] rounded-xl shadow-xl p-8">

        <h2 className="text-2xl font-bold text-blue-700 mb-6">
          {weaver ? "Edit Weaver" : "Add Weaver"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-5"
        >

          <div>
            <label>Weaver ID</label>

            <input
              type="text"
              name="weaverId"
              value={formData.weaverId}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
              required
            />
          </div>

          <div>
            <label>Weaver Name</label>

            <input
              type="text"
              name="weaverName"
              value={formData.weaverName}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
              required
            />
          </div>

          <div>
            <label>Phone</label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
              required
            />
          </div>

          <div>
            <label>Experience (Years)</label>

            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label>Assigned Loom</label>

            <select
              name="assignedLoom"
              value={formData.assignedLoom}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            >
              <option value="">Select Loom</option>

              {looms.map((loom) => (
                <option
                  key={loom._id}
                  value={loom.loomId}
                >
                  {loom.loomId}
                </option>
              ))}

            </select>

          </div>

          <div>
            <label>Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            >
              <option>Active</option>
              <option>Leave</option>
            </select>

          </div>

          <div className="col-span-2">

            <label>Notes</label>

            <textarea
              rows="4"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />

          </div>

          <div className="col-span-2 flex justify-end gap-4">

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              {weaver ? "Update Weaver" : "Save Weaver"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default WeaverForm;