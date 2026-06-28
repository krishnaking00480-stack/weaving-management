import { useEffect, useState } from "react";
import api from "../../services/api";

function WeaverTable({
  refresh,
  search,
  onEdit,
  onDelete,
}) {
  const [weavers, setWeavers] = useState([]);

  const fetchWeavers = async () => {
    try {
      const response = await api.get("/weavers");
      setWeavers(response.data.data);
    } catch (error) {
      console.error("Error fetching weavers:", error);
    }
  };

  useEffect(() => {
    fetchWeavers();
  }, [refresh]);

  const filteredWeavers = weavers.filter((weaver) =>
    weaver.weaverId.toLowerCase().includes(search.toLowerCase()) ||
    weaver.weaverName.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";

      case "Inactive":
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
            <th>Weaver ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Assigned Loom</th>
            <th>Experience</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {filteredWeavers.length === 0 ? (

            <tr>

              <td
                colSpan="9"
                className="text-center py-8 text-gray-500"
              >
                No Weavers Found
              </td>

            </tr>

          ) : (

            filteredWeavers.map((weaver, index) => (

              <tr
                key={weaver._id}
                className="border-b hover:bg-blue-50 transition duration-200 text-center"
              >

                <td className="p-4 font-semibold">
                  {index + 1}
                </td>

                <td className="font-semibold text-blue-700">
                  {weaver.weaverId}
                </td>

                <td>{weaver.weaverName}</td>

                <td>{weaver.phone}</td>

                <td>{weaver.assignedLoom || "-"}</td>

                <td>{weaver.experience} Years</td>

                <td className="font-semibold text-green-700">
                  ₹ {Number(weaver.salary).toLocaleString()}
                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(
                      weaver.status
                    )}`}
                  >
                    {weaver.status}
                  </span>

                </td>

                <td>

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => onEdit(weaver)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(weaver._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
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

export default WeaverTable;