import { useEffect, useState } from "react";
import api from "../../services/api";

function SalesForm({ sales, onClose, onSuccess }) {

  // ===========================
  // Completed Productions
  // ===========================
  const [productions, setProductions] = useState([]);

  // ===========================
  // Form Data
  // ===========================
  const [formData, setFormData] = useState({
    productionId: "",
    loomId: "",
    weaverName: "",
    sareeName: "",

    receivedStatus: "Pending",

    quality: "Good",

    problemDetails: "",

    sareeWeight: "",

    saleRate: "",

    labourStatus: "Pending",

    labourAmount: "",

    receivedDate: "",

    remarks: "",
  });

  // ===========================
  // Fetch Completed Productions
  // ===========================
  const fetchProductions = async () => {
    try {

      const response = await api.get("/productions");

      const completed = response.data.data.filter(
        (item) => item.status === "Completed"
      );

      setProductions(completed);

    } catch (error) {

      console.error(error);

    }
  };

  // ===========================
  // Load Existing Data
  // ===========================
  useEffect(() => {

    fetchProductions();

    if (sales) {

      setFormData({
        productionId:
            sales.productionId?._id || sales.productionId || "",
        loomId: sales.loomId || "",
        weaverName: sales.weaverName || "",
        sareeName: sales.sareeName || "",

        receivedStatus: sales.receivedStatus || "Pending",

        quality: sales.quality || "Good",

        problemDetails: sales.problemDetails || "",

        sareeWeight: sales.sareeWeight || "",

        saleRate: sales.saleRate || "",

        labourStatus: sales.labourStatus || "Pending",

        labourAmount: sales.labourAmount || "",

        receivedDate: sales.receivedDate
          ? sales.receivedDate.substring(0, 10)
          : "",

        remarks: sales.remarks || "",
      });

    }

  }, [sales]);

  // ===========================
  // Handle Change
  // ===========================
  const handleChange = (e) => {

  const { name, value } = e.target;

setFormData({
  productionId: selected._id,

  loomId: selected.loomId,

  weaverName: selected.weaverName,

  sareeName: selected.sareeName,

  receivedStatus: "Pending",

  quality: "Good",

  problemDetails: "",

  sareeWeight: "",

  saleRate: "",

  labourStatus: "Pending",

  labourAmount: "",

  receivedDate: "",

  remarks: "",
});

};

  // ===========================
  // Auto Fill From Production
  // ===========================
  const handleProductionChange = (e) => {

    const id = e.target.value;

    const selected = productions.find(
      (item) => item._id === id
    );

    if (!selected) return;

setFormData((prev) => ({

  ...prev,

  productionId: selected._id,

  loomId: selected.loomId,

  weaverName: selected.weaverName,

  sareeName: selected.sareeName,

  receivedStatus: "Pending",

  quality: "Good",

  problemDetails: "",

}));

  };

  // ===========================
  // Submit
  // ===========================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (sales) {

        await api.put(
          `/sales/${sales._id}`,
          formData
        );

      } else {

        await api.post(
          "/sales",
          formData
        );

      }

      onSuccess();
      onClose();

    } catch (error) {

      console.error(error);

      alert("Failed to Save Sales");

    }

  };
    return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white w-[850px] rounded-xl shadow-xl p-8 max-h-[90vh] overflow-y-auto">

        <h2 className="text-2xl font-bold text-blue-700 mb-6">
          {sales ? "Edit Sales" : "New Sales Entry"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-5"
        >

          {/* Production */}

          <div className="col-span-2">

            <label className="font-semibold">
              Completed Production
            </label>

            <select
                name="productionId"
                value={formData.productionId}
              onChange={handleProductionChange}
              className="w-full border rounded-lg p-3 mt-2"
              required
            >

              <option value="">
                Select Completed Production
              </option>

              {productions.map((item) => (

                <option
                  key={item._id}
                  value={item._id}
                >
                  {item.loomId} - {item.weaverName} - {item.sareeName}
                </option>

              ))}

            </select>

          </div>

          {/* Loom */}

          <div>

            <label>Loom ID</label>

            <input
              value={formData.loomId}
              readOnly
              className="w-full border rounded-lg p-3 mt-2 bg-gray-100"
            />

          </div>

          {/* Weaver */}

          <div>

            <label>Weaver</label>

            <input
              value={formData.weaverName}
              readOnly
              className="w-full border rounded-lg p-3 mt-2 bg-gray-100"
            />

          </div>

          {/* Saree */}

          <div className="col-span-2">

            <label>Saree Name</label>

            <input
              value={formData.sareeName}
              readOnly
              className="w-full border rounded-lg p-3 mt-2 bg-gray-100"
            />

          </div>

          {/* Received */}

          <div>

            <label>Received Status</label>

            <select
              name="receivedStatus"
              value={formData.receivedStatus}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            >
              <option>Pending</option>
              <option>Received</option>
            </select>

          </div>

          {/* Quality */}

          <div>

            <label>Quality</label>

            <select
              name="quality"
              value={formData.quality}
              onChange={handleChange}
              disabled={formData.receivedStatus !== "Received"}
              className="w-full border rounded-lg p-3 mt-2"
            >
              <option>Good</option>
              <option>Minor Defect</option>
              <option>Major Defect</option>
            </select>

          </div>

          {/* Problem */}

          {(formData.quality === "Minor Defect" ||
            formData.quality === "Major Defect") && (

            <div className="col-span-2">

              <label>Problem Details</label>

              <textarea
                rows="3"
                name="problemDetails"
                value={formData.problemDetails}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />

            </div>

          )}

          {/* Weight */}

          <div>

            <label>Saree Weight (grams)</label>

            <input
              type="number"
              min="0"
              name="sareeWeight"
              value={formData.sareeWeight}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
              required
            />

          </div>

          {/* Rate */}

          <div>

            <label>Sale Rate (₹)</label>

            <input
              type="number"
              min="0"
              name="saleRate"
              value={formData.saleRate}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
              required
            />

          </div>

          {/* Labour */}

          <div>

            <label>Labour Status</label>

            <select
              name="labourStatus"
              value={formData.labourStatus}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            >
              <option>Pending</option>
              <option>Paid</option>
            </select>

          </div>

          {/* Labour Amount */}

          <div>

            <label>Labour Amount (₹)</label>

            <input
              type="number"
              min="0"
              name="labourAmount"
              value={formData.labourAmount}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />

          </div>

          {/* Date */}

          <div>

            <label>Received Date</label>

            <input
              type="date"
              name="receivedDate"
              value={formData.receivedDate}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
              required
            />

          </div>

          {/* Profit */}

          <div>

            <label>Estimated Profit (₹)</label>

            <input
              readOnly
              value={
                Number(formData.saleRate || 0) -
                Number(formData.labourAmount || 0)
              }
              className="w-full border rounded-lg p-3 mt-2 bg-green-100 font-bold text-green-700"
            />

          </div>

          {/* Remarks */}

          <div className="col-span-2">

            <label>Remarks</label>

            <textarea
              rows="4"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />

          </div>

          {/* Buttons */}

          <div className="col-span-2 flex justify-end gap-4">

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
              {sales ? "Update Sales" : "Save Sales"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default SalesForm;