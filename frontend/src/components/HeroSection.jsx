import { useState } from "react";

export default function HeroSection({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(search);
  };

  return (
    <div className="bg-gradient-to-r from-pink-50 to-pink-100 py-12 px-6">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">

        {/* LEFT CONTENT */}
        <div>

          <h1 className="text-4xl font-bold text-gray-800 leading-tight">
            Find Your Ideal <span className="text-pink-500">PG</span> or{" "}
            <span className="text-pink-500">Flat</span>
          </h1>

          <p className="text-gray-500 mt-3">
            Discover verified rentals with real photos, transparent pricing,
            and easy booking.
          </p>

          {/* SEARCH BAR */}
          <div className="mt-5 bg-white p-2 rounded-xl shadow-md flex items-center border hover:shadow-lg transition">

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search city or area..."
              className="flex-1 px-3 py-2 outline-none text-sm"
            />

            <button
              onClick={handleSearch}
              className="bg-pink-500 text-white px-5 py-2 rounded-lg hover:bg-pink-600 transition"
            >
              Search
            </button>

          </div>

          {/* FILTER TAGS */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {["₹2000-3000", "WiFi", "Food", "AC"].map((tag, i) => (
              <span
                key={i}
                className="bg-white border px-3 py-1 rounded-full text-xs hover:bg-pink-50 cursor-pointer transition"
              >
                {tag}
              </span>
            ))}
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <img
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
          className="rounded-2xl shadow-md h-[280px] w-full object-cover"
        />

      </div>
    </div>
  );
}