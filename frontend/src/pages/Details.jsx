import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Details() {

  const { id } = useParams();
  const [p, setP] = useState(null);

  useEffect(() => {
    api.get(`/property/details/${id}`)
      .then(res => setP(res.data));
  }, []);

  if (!p) return <p>Loading...</p>;

  return (
    <div className="p-6">

      {/* IMAGES */}
      <div className="grid md:grid-cols-2 gap-4">
        {p.images.map((img, i) => (
          <img key={i} src={img} className="rounded-xl h-60 object-cover" />
        ))}
      </div>

      <h1 className="text-2xl font-bold mt-4">{p.title}</h1>

      <p className="text-gray-500">{p.location}</p>

      <p className="text-lg text-pink-500 mt-2">₹{p.price}</p>

      {/* FACILITIES */}
      <div className="mt-4">
        <h3 className="font-semibold">Facilities</h3>
        <div className="flex gap-2 flex-wrap mt-2">
          {p.facilities.map((f, i) => (
            <span key={i} className="bg-gray-100 px-2 py-1 rounded">
              {f}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}