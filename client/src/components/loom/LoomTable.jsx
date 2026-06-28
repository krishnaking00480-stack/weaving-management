import { useEffect, useState } from "react";
import api from "../../services/api";

function LoomTable({
  refresh,
  search,
  onEdit,
  onDelete,
}) {

  const [looms, setLooms] = useState([]);

  const filteredLooms = looms.filter((loom) =>
    loom.loomId.toLowerCase().includes(search.toLowerCase()) ||
    loom.weaverName.toLowerCase().includes(search.toLowerCase())
  );

  const fetchLooms = async () => {
    try {
      const response = await api.get("/looms");
      setLooms(response.data.data);
    } catch (error) {
      console.error("Error fetching looms:", error);
    }
  };

  useEffect(() => {
    fetchLooms();
  }, [refresh]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Running":
        return "bg-green-100 text-green-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Completed":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-xl">

      <table className="w-full">

        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-4">Loom ID</th>
            <th>Weaver</th>
            <th>Saree Type</th>
            <th>Ari Count</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>Expected Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredLooms.length === 0 ? (

            <tr>
              <td
                colSpan="8"
                className="text-center py-8 text-gray-500"
              >
                No Looms Found
              </td>
            </tr>

          ) : (

            filteredLooms.map((loom) => (

              <tr
                key={loom._id}
                className="border-b hover:bg-gray-50 text-center"
              >

                <td className="p-4 font-semibold">
                  {loom.loomId}
                </td>

                <td>{loom.weaverName}</td>

                <td>{loom.sareeType}</td>

                <td>{loom.ariCount}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(
                      loom.status
                    )}`}
                  >
                    {loom.status}
                  </span>
                </td>

                <td>
                  {loom.startDate
                    ? new Date(loom.startDate).toLocaleDateString()
                    : "-"}
                </td>

                <td>
                  {loom.expectedDate
                    ? new Date(loom.expectedDate).toLocaleDateString()
                    : "-"}
                </td>

                <td className="space-x-2">

                  <button
                    onClick={() => onEdit(loom)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(loom._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default LoomTable;