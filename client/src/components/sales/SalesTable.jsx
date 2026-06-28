import { useEffect, useState } from "react";
import api from "../../services/api";

function SalesTable({
  refresh,
  search,
  onEdit,
  onDelete,
}) {
  const [sales, setSales] = useState([]);

  // ===========================
  // Fetch Sales
  // ===========================
  const fetchSales = async () => {
    try {
      const response = await api.get("/sales");
      setSales(response.data.data);
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [refresh]);

  // ===========================
  // Search
  // ===========================
  const filteredSales = sales.filter((sale) => {
    const searchText = search.toLowerCase();

    return (
      sale.loomId?.toLowerCase().includes(searchText) ||
      sale.weaverName?.toLowerCase().includes(searchText) ||
      sale.sareeName?.toLowerCase().includes(searchText)
    );
  });

  // ===========================
  // Quality Badge
  // ===========================
  const qualityColor = (quality) => {
    switch (quality) {
      case "Good":
        return "bg-green-100 text-green-700";

      case "Minor Defect":
        return "bg-yellow-100 text-yellow-700";

      case "Major Defect":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ===========================
  // Labour Badge
  // ===========================
  const labourColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg">

      <table className="min-w-full">

        <thead className="bg-blue-600 text-white">

          <tr>
            <th className="p-4">#</th>
            <th>Loom</th>
            <th>Weaver</th>
            <th>Saree</th>
            <th>Quality</th>
            <th>Weight (g)</th>
            <th>Rate (₹)</th>
            <th>Labour</th>
            <th>Profit (₹)</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {filteredSales.length === 0 ? (

            <tr>

              <td
                colSpan="10"
                className="text-center py-8 text-gray-500"
              >
                No Sales Records Found
              </td>

            </tr>

          ) : (

            filteredSales.map((sale, index) => (

              <tr
                key={sale._id}
                className="border-b hover:bg-blue-50 text-center"
              >

                <td className="p-4 font-semibold">
                  {index + 1}
                </td>

                <td className="font-semibold text-blue-700">
                  {sale.loomId}
                </td>

                <td>{sale.weaverName}</td>

                <td>{sale.sareeName}</td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${qualityColor(
                      sale.quality
                    )}`}
                  >
                    {sale.quality}
                  </span>

                </td>

                <td>{sale.sareeWeight} g</td>

                <td className="font-semibold text-green-700">
                  ₹ {Number(sale.saleRate).toLocaleString()}
                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${labourColor(
                      sale.labourStatus
                    )}`}
                  >
                    {sale.labourStatus}
                  </span>

                </td>

                <td className="font-bold text-blue-700">
                  ₹{" "}
                  {(
                    Number(sale.saleRate || 0) -
                    Number(sale.labourAmount || 0)
                  ).toLocaleString()}
                </td>

                <td>

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => onEdit(sale)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(sale._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default SalesTable;