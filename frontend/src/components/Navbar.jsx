import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-pink-100 shadow-[0_4px_20px_rgba(236,72,153,0.08)]">

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">

        <div className="flex items-center justify-between">

          {/* LOGO */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer group"
          >

            <div>

              <h1 className="text-2xl font-bold text-pink-500 ">
              🏠  ApnaSpace
              </h1>

            </div>

          </div>

          {/* MENU */}
          <div className="hidden md:flex items-center gap-2">

            <button
              onClick={() => navigate("/")}
              className="px-5 py-2 rounded-xl text-gray-700 hover:bg-pink-50 hover:text-pink-500 transition-all duration-300 font-medium"
            >
              Home
            </button>

            <button
              onClick={() => navigate("/search")}
              className="px-5 py-2 rounded-xl text-gray-700 hover:bg-pink-50 hover:text-pink-500 transition-all duration-300 font-medium"
            >
              Search
            </button>

            <button
              className="px-5 py-2 rounded-xl text-gray-700 hover:bg-pink-50 hover:text-pink-500 transition-all duration-300 font-medium"
            >
              Bookings
            </button>

          </div>

          {/* BUTTON */}
          <button
            onClick={() => navigate("/add-property")}
            className="bg-pink-500 hover:bg-pink-600 text-white px-5 md:px-6 py-3 rounded-2xl font-semibold shadow-md hover:shadow-xl "
          >
            List Property
          </button>

        </div>

      </div>

    </header>
  );
}