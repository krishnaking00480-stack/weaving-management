import { useEffect, useState } from "react";
import api from "../../services/api";

function ProductionForm({ production, onClose, onSuccess }) {
  const [looms, setLooms] = useState([]);
  const [weavers, setWeavers] = useState([]);

  const [formData, setFormData] = useState({
    loomId: "",
    weaverName: "",
    sareeName: "",
    design: "",
    color: "",
    quantity: 1,
    startDate: "",
    expectedEndDate: "",
    completedDate: "",
    status: "Running",
    notes: "",
  });

  // ===========================
  // Fetch Looms & Weavers
  // ===========================
  const fetchData = async () => {
    try {
      const loomRes = await api.get("/looms");
      const weaverRes = await api.get("/weavers");

      setLooms(loomRes.data.data);
      setWeavers(weaverRes.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();

    if (production) {
      setFormData({
        loomId: production.loomId || "",
        weaverName: production.weaverName || "",
        sareeName: production.sareeName || "",
        design: production.design || "",
        color: production.color || "",
        quantity: production.quantity || 1,
        startDate: production.startDate
          ? production.startDate.substring(0, 10)
          : "",
        expectedEndDate: production.expectedEndDate
          ? production.expectedEndDate.substring(0, 10)
          : "",
        completedDate: production.completedDate
          ? production.completedDate.substring(0, 10)
          : "",
        status: production.status || "Running",
        notes: production.notes || "",
      });
    }
  }, [production]);

  // ===========================
  // Handle Change
  // ===========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ===========================
  // Submit
  // ===========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (production) {
        await api.put(`/productions/${production._id}`, formData);
      } else {
        await api.post("/productions", formData);
      }

      onSuccess();

    } catch (error) {
      console.error(error);
      alert("Failed to Save Production");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white w-[850px] rounded-xl shadow-xl p-8 max-h-[90vh] overflow-y-auto">

        <h2 className="text-2xl font-bold text-blue-700 mb-6">
          {production ? "Edit Production" : "New Production"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-5"
        >

          <div>
            <label>Loom ID</label>

            <select
              name="loomId"
              value={formData.loomId}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
              required
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
            <label>Weaver</label>

            <select
              name="weaverName"
              value={formData.weaverName}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
              required
            >
              <option value="">Select Weaver</option>

              {weavers.map((weaver) => (
                <option
                  key={weaver._id}
                  value={weaver.weaverName}
                >
                  {weaver.weaverName}
                </option>
              ))}

            </select>
          </div>

          <div>
            <label>Saree Name</label>

            <input
              type="text"
              name="sareeName"
              value={formData.sareeName}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
              required
            />
          </div>

          <div>
            <label>Design</label>

            <input
              type="text"
              name="design"
              value={formData.design}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
              required
            />
          </div>

          <div>
            <label>Color</label>

            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
              required
            />
          </div>

          <div>
            <label>Quantity</label>

            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
              min="1"
            />
          </div>

          <div>
            <label>Start Date</label>

            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
              required
            />
          </div>

          <div>
            <label>Expected End Date</label>

            <input
              type="date"
              name="expectedEndDate"
              value={formData.expectedEndDate}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
              required
            />
          </div>

          <div>
            <label>Completed Date</label>

            <input
              type="date"
              name="completedDate"
              value={formData.completedDate}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label>Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            >
              <option>Running</option>
              <option>Completed</option>
              <option>On Hold</option>
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
              {production ? "Update Production" : "Save Production"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default ProductionForm;