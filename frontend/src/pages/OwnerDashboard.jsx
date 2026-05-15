import { useEffect, useState } from "react";
import api from "../services/api";

export default function OwnerDashboard() {

  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);

  const ownerId = "tempOwner123";

  // FETCH OWNER PROPERTIES
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    api.get(`/property/owner/${ownerId}`)
      .then(res => setData(res.data));
  };

  // DELETE
  const handleDelete = async (id) => {
    await api.delete(`/property/delete/${id}`);
    fetchData();
  };

  // UPDATE
  const handleUpdate = async () => {
    await api.put(`/property/update/${editData._id}`, editData);
    setEditData(null);
    fetchData();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Owner Dashboard</h1>

        <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600">
          + Add Property
        </button>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        {data.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition overflow-hidden"
          >

            {/* IMAGE */}
            <img
              src={p.images?.[0]}
              className="h-40 w-full object-cover"
            />

            <div className="p-4">

              <h2 className="font-semibold">{p.title}</h2>
              <p className="text-sm text-gray-500">{p.location}</p>

              <p className="text-pink-500 font-bold mt-2">
                ₹{p.price}
              </p>

              {/* STATUS */}
              <div className="mt-2 text-sm">
                Status:
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  p.availability === "available"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}>
                  {p.availability}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2 mt-4">

                {/* EDIT */}
                <button
                  onClick={() => setEditData(p)}
                  className="flex-1 border rounded py-1 hover:bg-gray-100"
                >
                  Edit
                </button>

                {/* STATUS TOGGLE */}
                <button
                  onClick={() =>
                    api.put(`/property/update/${p._id}`, {
                      availability:
                        p.availability === "available"
                          ? "occupied"
                          : "available"
                    }).then(fetchData)
                  }
                  className="flex-1 border rounded py-1 text-yellow-600 hover:bg-yellow-50"
                >
                  Toggle
                </button>

                {/* DELETE */}
                <button
                  onClick={() => handleDelete(p._id)}
                  className="flex-1 border rounded py-1 text-red-500 hover:bg-red-50"
                >
                  Delete
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>

      {/* 🔥 EDIT MODAL */}
      {editData && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-96">

            <h2 className="text-lg font-semibold mb-4">
              Edit Property
            </h2>

            <input
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              value={editData.price}
              onChange={(e) =>
                setEditData({ ...editData, price: e.target.value })
              }
              className="w-full border p-2 mb-3 rounded"
            />

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setEditData(null)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-3 py-1 bg-pink-500 text-white rounded"
              >
                Save
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}