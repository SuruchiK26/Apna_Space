import { useNavigate } from "react-router-dom";

export default function PropertyCard({ p }) {
  const navigate = useNavigate();

  const total =
    p.price + (p.electricity || 0) + (p.foodCost || 0);

  return (
    <div
  onClick={() => navigate(`/property/${p._id}`)}
  className="
    min-w-[320px]
    max-w-[320px]
    flex-shrink-0
    bg-white
    rounded-3xl
    overflow-hidden
    border
    border-pink-100
    shadow-sm
    hover:shadow-xl
    transition-all
    duration-300
  "
>

  {/* IMAGE */}
  <div className="relative overflow-hidden">

    <img
      src={
        p.images?.[0]
          || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
      }
      alt={p.title}
      className="h-56 w-full object-cover group-hover:scale-105 transition duration-500"
    />

    {/* TYPE BADGE */}
    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-pink-600 shadow">

      {p.type}

    </div>

    {/* RATING */}
    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow">

      ⭐ {p.avgRating || 4.5}

    </div>

  </div>

  {/* CONTENT */}
  <div className="p-5">

    {/* TITLE */}
    <div className="flex justify-between items-start">

      <div>

        <h2 className="text-lg font-bold text-gray-800 line-clamp-1">

          {p.title}

        </h2>

        <p className="text-sm text-gray-500 mt-1 line-clamp-1">

          📍 {p.location}

        </p>

      </div>

    </div>

    {/* FACILITIES */}
    <div className="flex flex-wrap gap-2 mt-4">

      {p.facilities?.slice(0, 3).map((f, i) => (

        <span
          key={i}
          className="bg-pink-50 text-pink-600 text-xs px-3 py-1 rounded-full font-medium"
        >
          {f}
        </span>

      ))}

    </div>

    {/* PRICE */}
    <div className="flex justify-between items-center mt-5">

      <div>

        <h3 className="text-2xl font-bold text-pink-500">

          ₹{p.price}

        </h3>

        <p className="text-xs text-gray-400">

          per month

        </p>

      </div>

      {/* AVAILABILITY */}
      <div className="bg-green-50 text-green-600 text-xs px-3 py-2 rounded-full font-semibold">

        ● Available

      </div>

    </div>

    {/* BUTTON */}
    <button
  className="
    w-full
    mt-5
    bg-pink-500
    hover:bg-pink-600
    text-white
    py-3
    rounded-xl
    font-medium
    transition
  "
>
  View Details
</button>

  </div>

</div>
  );
}