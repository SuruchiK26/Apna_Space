import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api";
import PropertyCard from "../components/PropertyCard";

export default function Search() {

  const [data, setData] = useState([]);
  const [coords, setCoords] = useState(null);

  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [seater, setSeater] = useState("");

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const type = query.get("type");

  // 📍 GET LOCATION
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoords({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      });
    });
  }, []);

  // 📍 FETCH DATA
  const fetchData = async () => {
    if (!coords) return;

    const res = await api.get("/property/search", {
  params: {
    lat: coords.lat,
    lng: coords.lng,
    minPrice,
    maxPrice,
    category,
    gender
  }
});

    let result = res.data;

    // CATEGORY FILTER
    if (type === "budget") {
      result = result.filter(p => p.price <= 3000);
    }
    if (type === "top") {
      result = result.filter(p => p.avgRating >= 4.5);
    }

    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, [coords]);

  return (
    <div className="p-6">

      <h1 className="text-2xl font-semibold mb-4">
        Explore Properties
      </h1>

      {/* 🔥 FILTER BAR */}
      <div className="flex gap-3 mb-6 flex-wrap">

        <button
          onClick={() => { setMin(2000); setMax(3000); fetchData(); }}
          className="px-3 py-1 border rounded hover:bg-pink-50"
        >
          ₹2000–3000
        </button>

        <button onClick={() => setSeater("single")}
          className="px-3 py-1 border rounded">
          Single
        </button>

        <button onClick={() => setSeater("double")}
          className="px-3 py-1 border rounded">
          Double
        </button>

        <button onClick={() => setSeater("triple")}
          className="px-3 py-1 border rounded">
          Triple
        </button>

      </div>

      {/* 🏠 GRID */}
      <div className="grid md:grid-cols-4 gap-6">

        {data.map(p => (
          <PropertyCard key={p._id} p={p} />
        ))}

      </div>

    </div>
  );
}