import { useEffect, useState } from "react";
import api from "../../services/api";

function PurchaseForm({ purchase, onClose, onSuccess }) {
  const [looms, setLooms] = useState([]);

  const [formData, setFormData] = useState({
    loomId: "",
    materialName: "",
    requiredQuantity: "",
    supplier: "",
    status: "Pending",
    notes: "",
  });

  // ===========================
  // Fetch Looms
  // ===========================
  const fetchLooms = async () => {
    try {
      const res = await api.get("/looms");
      setLooms(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLooms();

    if (purchase) {
      setFormData({
        loomId: purchase.loomId || "",
        materialName: purchase.materialName || "",
        requiredQuantity: purchase.requiredQuantity || "",
        supplier: purchase.supplier || "",
        status: purchase.status || "Pending",
        notes: purchase.notes || "",
      });
    }
  }, [purchase]);

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
      if (purchase) {
        await api.put(`/purchases/${purchase._id}`, formData);
      } else {
        await api.post("/purchases", formData);
      }

      onSuccess();

    } catch (error) {
      console.error(error);
      alert("Failed to Save Purchase");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white w-[700px] rounded-xl shadow-xl p-8">

        <h2 className="text-2xl font-bold text-blue-700 mb-6">
          {purchase ? "Edit Purchase" : "Purchase Request"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-5"
        >

          <div className="col-span-2">
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
            <label>Material</label>

            <select
              name="materialName"
              value={formData.materialName}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
              required
            >
              <option value="">Select Material</option>

              <option>Thaadai</option>
              <option>Thaadai Pirikurathu</option>

              <option>Udal Pattu</option>
              <option>Karai Pattu</option>
              <option>Selpu Pattu</option>

              <option>Selpu Jarigai</option>
              <option>Pettu Jarigai</option>

            </select>

          </div>

          <div>
            <label>Required Quantity (g)</label>

            <input
              type="number"
              name="requiredQuantity"
              value={formData.requiredQuantity}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
              required
            />
          </div>

          <div>
            <label>Supplier</label>

            <input
              type="text"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
              required
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
              <option>Pending</option>
              <option>Ordered</option>
              <option>Received</option>
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
              {purchase ? "Update Purchase" : "Save Purchase"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default PurchaseForm;