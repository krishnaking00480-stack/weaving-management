import { useEffect, useState } from "react";
import api from "../../services/api";

function PurchaseTable({
  refresh,
  search,
  onEdit,
  onDelete,
}) {
  const [purchases, setPurchases] = useState([]);

  const fetchPurchases = async () => {
    try {
      const response = await api.get("/purchases");
      setPurchases(response.data.data);
    } catch (error) {
      console.error("Error fetching purchases:", error);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, [refresh]);

  const filteredPurchases = purchases.filter((purchase) =>
    purchase.loomId?.toLowerCase().includes(search.toLowerCase()) ||
    purchase.materialName?.toLowerCase().includes(search.toLowerCase()) ||
    purchase.supplier?.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Ordered":
        return "bg-blue-100 text-blue-700";

      case "Received":
        return "bg-green-100 text-green-700";

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
            <th>Loom ID</th>
            <th>Material</th>
            <th>Required Qty (g)</th>
            <th>Supplier</th>
            <th>Status</th>
            <th>Purchase Date</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {filteredPurchases.length === 0 ? (

            <tr>

              <td
                colSpan="8"
                className="text-center py-8 text-gray-500"
              >
                No Purchase Requests Found
              </td>

            </tr>

          ) : (

            filteredPurchases.map((purchase, index) => (

              <tr
                key={purchase._id}
                className="border-b hover:bg-blue-50 text-center"
              >

                <td className="p-4">
                  {index + 1}
                </td>

                <td className="font-bold text-blue-700">
                  {purchase.loomId}
                </td>

                <td>
                  {purchase.materialName}
                </td>

                <td>
                  {purchase.requiredQuantity} g
                </td>

                <td>
                  {purchase.supplier}
                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(
                      purchase.status
                    )}`}
                  >
                    {purchase.status}
                  </span>

                </td>

                <td>
                  {purchase.purchaseDate
                    ? new Date(
                        purchase.purchaseDate
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td>

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => onEdit(purchase)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(purchase._id)}
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

export default PurchaseTable;