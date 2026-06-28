import { useEffect, useState } from "react";
import api from "../../services/api";

function ProductionTable({
  refresh,
  search,
  onEdit,
  onDelete,
}) {
  const [productions, setProductions] = useState([]);

  const fetchProductions = async () => {
    try {
      const response = await api.get("/productions");
      setProductions(response.data.data);
    } catch (error) {
      console.error("Error fetching productions:", error);
    }
  };

  useEffect(() => {
    fetchProductions();
  }, [refresh]);

  const filteredProductions = productions.filter((production) =>
    production.loomId?.toLowerCase().includes(search.toLowerCase()) ||
    production.weaverName?.toLowerCase().includes(search.toLowerCase()) ||
    production.sareeName?.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "Running":
        return "bg-yellow-100 text-yellow-700";

      case "Completed":
        return "bg-green-100 text-green-700";

      case "On Hold":
        return "bg-red-100 text-red-700";

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
            <th>Weaver</th>
            <th>Saree</th>
            <th>Design</th>
            <th>Color</th>
            <th>Qty</th>
            <th>Start Date</th>
            <th>Expected End</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {filteredProductions.length === 0 ? (

            <tr>

              <td
                colSpan="11"
                className="text-center py-8 text-gray-500"
              >
                No Production Records Found
              </td>

            </tr>

          ) : (

            filteredProductions.map((production, index) => (

              <tr
                key={production._id}
                className="border-b hover:bg-blue-50 text-center"
              >

                <td className="p-4">
                  {index + 1}
                </td>

                <td className="font-bold text-blue-700">
                  {production.loomId}
                </td>

                <td>{production.weaverName}</td>

                <td>{production.sareeName}</td>

                <td>{production.design}</td>

                <td>{production.color}</td>

                <td>{production.quantity}</td>

                <td>
                  {production.startDate
                    ? new Date(
                        production.startDate
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td>
                  {production.expectedEndDate
                    ? new Date(
                        production.expectedEndDate
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(
                      production.status
                    )}`}
                  >
                    {production.status}
                  </span>

                </td>

                <td>

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => onEdit(production)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(production._id)}
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

export default ProductionTable;