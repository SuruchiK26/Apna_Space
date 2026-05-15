import { useNavigate } from "react-router-dom";
import PropertyCard from "./PropertyCard";

export default function PropertyRow({
  title,
  data,
  type
}) {

  const navigate = useNavigate();

  return (

    <div className="px-4 md:px-8 py-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">

        <div>

          <h2 className="text-3xl font-bold text-gray-800">
            {title}
          </h2>

        </div>

        {/* SEE ALL */}
        <button
          onClick={() =>
            navigate(`/search?type=${type}`)
          }
          className="
            text-pink-500
            font-medium
            hover:text-pink-600
            transition
          "
        >
          See All →
        </button>

      </div>

      {/* PROPERTY ROW */}
      <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">

        {data.map((p) => (

          <div
            key={p._id}
            className="flex-shrink-0"
          >
            <PropertyCard p={p} />
          </div>

        ))}

      </div>

    </div>

  );

}