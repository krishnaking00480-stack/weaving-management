import { useEffect, useState } from "react";
import api from "../../services/api";

function MaterialTable({
  refresh,
  search,
  onEdit,
  onDelete,
}) {
  const [materials, setMaterials] = useState([]);

  const fetchMaterials = async () => {
    try {
      const response = await api.get("/materials");
      setMaterials(response.data.data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, [refresh]);

  const filteredMaterials = materials.filter((material) =>
    material.loomId
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg">

      <table className="min-w-full">

        <thead className="bg-blue-600 text-white">

          <tr>
            <th className="p-4">#</th>
            <th>Loom ID</th>

            <th>Thaadai (g)</th>
            <th>Pirikurathu (g)</th>

            <th>Udal Pattu (g)</th>
            <th>Karai Pattu (g)</th>
            <th>Selpu Pattu (g)</th>

            <th>Selpu Jarigai (g)</th>
            <th>Pettu Jarigai (g)</th>

            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {filteredMaterials.length === 0 ? (

            <tr>

              <td
                colSpan="10"
                className="text-center py-8 text-gray-500"
              >
                No Material Allocation Found
              </td>

            </tr>

          ) : (

            filteredMaterials.map((material, index) => (

              <tr
                key={material._id}
                className="border-b hover:bg-blue-50 text-center"
              >

                <td className="p-4">
                  {index + 1}
                </td>

                <td className="font-bold text-blue-700">
                  {material.loomId}
                </td>

                <td>{material.thaadai} g</td>

                <td>{material.thaadaiPirikurathu} g</td>

                <td>{material.udalPattu} g</td>

                <td>{material.karaiPattu} g</td>

                <td>{material.selpuPattu} g</td>

                <td>{material.selpuJarigai} g</td>

                <td>{material.pettuJarigai} g</td>

                <td>

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => onEdit(material)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(material._id)}
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

export default MaterialTable;