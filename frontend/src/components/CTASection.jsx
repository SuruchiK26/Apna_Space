import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="px-4 md:px-8 py-10">

      <div className="max-w-6xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-100 via-white to-rose-100 border border-pink-200 shadow-lg px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-xl transition-all duration-300">

        {/* SOFT BACKGROUND BLUR */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-pink-300/20 blur-3xl rounded-full"></div>

        <div className="absolute bottom-0 left-10 w-32 h-32 bg-rose-300/20 blur-3xl rounded-full"></div>

        {/* LEFT CONTENT */}
        <div className="relative z-10">

          <p className="text-pink-500 font-medium text-sm mb-2 tracking-wide">
            FOR PROPERTY OWNERS
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug">
            List your property <br className="hidden md:block" />
            and reach more tenants
          </h2>

          <p className="text-gray-600 mt-3 text-sm md:text-base max-w-xl">
            Add your PG, flat or hostel and connect with
            students & professionals searching nearby.
          </p>

        </div>

        {/* BUTTON */}
        <div className="relative z-10">

          <button
            onClick={() => navigate("/add-property")}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            + Add Property
          </button>

        </div>

      </div>

    </section>
  );
}