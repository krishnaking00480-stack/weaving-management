import { useEffect, useState } from "react";
import api from "../../services/api";

function MaterialForm({ material, onClose, onSuccess }) {
  const [looms, setLooms] = useState([]);

  const [formData, setFormData] = useState({
    loomId: "",

    // THAADAI
    thaadai: "",
    thaadaiPirikurathu: "",

    // PATTU
    udalPattu: "",
    karaiPattu: "",
    selpuPattu: "",

    // JARIGAI
    selpuJarigai: "",
    pettuJarigai: "",

    notes: "",
  });

  // ===========================
  // Fetch Looms
  // ===========================
  const fetchLooms = async () => {
    try {
      const response = await api.get("/looms");
      setLooms(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLooms();

    if (material) {
      setFormData({
        loomId: material.loomId || "",

        thaadai: material.thaadai || "",
        thaadaiPirikurathu: material.thaadaiPirikurathu || "",

        udalPattu: material.udalPattu || "",
        karaiPattu: material.karaiPattu || "",
        selpuPattu: material.selpuPattu || "",

        selpuJarigai: material.selpuJarigai || "",
        pettuJarigai: material.pettuJarigai || "",

        notes: material.notes || "",
      });
    }
  }, [material]);

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
  // Save
  // ===========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (material) {
        await api.put(`/materials/${material._id}`, formData);
      } else {
        await api.post("/materials", formData);
      }

      onSuccess();

    } catch (error) {
      console.error(error);
      alert("Failed to Save Material");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white w-[850px] rounded-xl shadow-xl p-8 max-h-[90vh] overflow-y-auto">

        <h2 className="text-2xl font-bold text-blue-700 mb-6">
          {material ? "Edit Material" : "Material Allocation"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-5"
        >

          {/* Loom */}

          <div className="col-span-2">
            <h3 className="text-xl font-bold text-blue-700 border-b pb-2">
              Loom Details
            </h3>
          </div>

          <div className="col-span-2">

            <label className="font-semibold">
              Loom ID
            </label>

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

          {/* THAADAI */}

          <div className="col-span-2 mt-4">
            <h3 className="text-xl font-bold text-green-700 border-b pb-2">
              THAADAI
            </h3>
          </div>

          <div>
            <label>Thaadai (g)</label>

            <input
              type="number"
              name="thaadai"
              value={formData.thaadai}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label>Thaadai Pirikurathu (Optional) (g)</label>

            <input
              type="number"
              name="thaadaiPirikurathu"
              value={formData.thaadaiPirikurathu}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          {/* PATTU */}

          <div className="col-span-2 mt-4">
            <h3 className="text-xl font-bold text-yellow-600 border-b pb-2">
              PATTU
            </h3>
          </div>

          <div>
            <label>Udal Pattu (g)</label>

            <input
              type="number"
              name="udalPattu"
              value={formData.udalPattu}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label>Karai Pattu (g)</label>

            <input
              type="number"
              name="karaiPattu"
              value={formData.karaiPattu}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div className="col-span-2">

            <label>Selpu Pattu (g)</label>

            <input
              type="number"
              name="selpuPattu"
              value={formData.selpuPattu}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />

          </div>

          {/* JARIGAI */}

          <div className="col-span-2 mt-4">
            <h3 className="text-xl font-bold text-purple-700 border-b pb-2">
              JARIGAI
            </h3>
          </div>

          <div>
            <label>Selpu Jarigai (g)</label>

            <input
              type="number"
              name="selpuJarigai"
              value={formData.selpuJarigai}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label>Pettu Jarigai (g)</label>

            <input
              type="number"
              name="pettuJarigai"
              value={formData.pettuJarigai}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          {/* Notes */}

          <div className="col-span-2 mt-4">

            <label className="font-semibold">
              Notes
            </label>

            <textarea
              rows="4"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />

          </div>

          {/* Buttons */}

          <div className="col-span-2 flex justify-end gap-4 mt-6">

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              {material ? "Update Material" : "Save Material"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default MaterialForm;