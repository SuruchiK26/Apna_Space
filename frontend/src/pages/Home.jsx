import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import TrustSection from "../components/TrustSection";
import TestimonialSection from "../components/TestimonialSection";
import Navbar from "../components/Navbar";
import PropertyRow from "../components/PropertyRow";
import CTASection from "../components/CTASection";

export default function Home({ userLocation, setUserLocation }) {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [coords, setCoords] = useState(
    userLocation?.coordinates || null
  );

  const navigate = useNavigate();

  // SET LOCATION COORDS
  useEffect(() => {
    if (userLocation?.coordinates) {
      setCoords(userLocation.coordinates);
    }
  }, [userLocation]);

  // FETCH PROPERTIES
  useEffect(() => {
    api
      .get("/property/list")
      .then((res) => {
        console.log(res.data);
        setProperties(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // 🔎 STRICT LOCATION FILTER

const filtered = properties.filter((p) => {

  const propertyLocation =
    p.location?.toLowerCase() || "";

  const landmark =
    p.landmarks?.toLowerCase() || "";

  const userSearch =
    search.toLowerCase();

  const currentLocation =
    userLocation?.address?.toLowerCase() || "";

  // ✅ MANUAL SEARCH
  if (search.trim()) {

    return (
      propertyLocation.includes(userSearch)
      ||
      landmark.includes(userSearch)
    );

  }

  // ✅ CURRENT LOCATION FILTER
  if (currentLocation) {

    // extract city keyword
    const city =
      currentLocation.includes("bhilai")
        ? "bhilai"
        : currentLocation;

    return (
      propertyLocation.includes(city)
      ||
      landmark.includes(city)
    );

  }

  // ❌ NO LOCATION → SHOW NOTHING
  return false;

});

  // PROPERTY TYPES
  const pg = filtered.filter((p) => p.type === "PG");

  const hostel = filtered.filter(
    (p) => p.type === "Hostel"
  );

  const flat = filtered.filter((p) => p.type === "Flat");

  // NEARBY
  const nearby = filtered.filter((p) => {
    if (!coords || !p.coordinates) return false;

    const distance = Math.sqrt(
      Math.pow(coords.lat - p.coordinates.lat, 2) +
        Math.pow(coords.lng - p.coordinates.lng, 2)
    );

    return distance < 0.5;
  });

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-rose-50 min-h-screen">

      {/* BACKGROUND BLOBS */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-30"></div>

      <div className="absolute top-40 right-0 w-96 h-96 bg-rose-200 rounded-full blur-3xl opacity-30"></div>

      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-pink-100 rounded-full blur-3xl opacity-40"></div>

      {/* NAVBAR */}
      <div className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b border-white/30 shadow-sm">
        <Navbar />
      </div>

      <div className="px-4 md:px-8 pt-6">

  <div className="max-w-6xl mx-auto">

    <div className="bg-white/80 backdrop-blur-md border border-pink-100 rounded-3xl px-5 md:px-7 py-5 shadow-[0_10px_40px_rgba(236,72,153,0.08)] hover:shadow-[0_15px_50px_rgba(236,72,153,0.15)] transition-all duration-300">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          {/* ICON */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center shadow-inner text-2xl">
            📍
          </div>

          {/* TEXT */}
          <div>

            <p className="text-sm text-gray-500 font-medium">
              Current Location
            </p>

            <h2 className="text-lg md:text-2xl font-bold text-gray-800 mt-1">
              {userLocation?.address || "Location not set"}
            </h2>

          </div>

        </div>

        {/* BUTTON */}
        <button
          onClick={() => {
            localStorage.removeItem("userLocation");
            setUserLocation(null);
          }}
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-5 py-3 rounded-2xl font-medium shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
        >
          Change Location
        </button>

      </div>

    </div>

  </div>

</div>

      {/* HERO SECTION */}
      <div className="relative z-10">
        <HeroSection onSearch={(value) => setSearch(value)} />
      </div>

      

      {/* TRUST SECTION */}
      <div className="relative z-10">
        <TrustSection />
      </div>

      {/* NEARBY */}
      {nearby.length > 0 && (
        <div className="relative z-10 mt-10">

          <div className="px-4 md:px-8">

            <div className="max-w-7xl mx-auto bg-gradient-to-r from-pink-100 to-rose-100 rounded-[2rem] p-6 shadow-xl border border-white/40">

              <div className="flex justify-between items-center mb-6">

                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    📍 Nearby Properties
                  </h2>

                  <p className="text-gray-600 mt-1">
                    Best stays around your selected location
                  </p>
                </div>

                <button className="bg-white text-pink-600 px-5 py-2 rounded-xl font-medium hover:shadow-lg transition">
                  View All
                </button>

              </div>

              <PropertyRow
                title=""
                data={nearby}
              />

            </div>

          </div>

        </div>
      )}

      {/* PROPERTY ROWS */}
      <div className="space-y-10 py-10 relative z-10">

        {/* PG */}
        <div className="px-4 md:px-8">

          <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-lg rounded-[2rem] shadow-xl border border-white/30 p-6 hover:shadow-2xl transition-all duration-300">

            <div className="flex justify-between items-center mb-5">

              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  🏠 PG Near You
                </h2>

                <p className="text-gray-500 mt-1">
                  Comfortable PG stays near your area
                </p>
              </div>

            </div>

            <PropertyRow title="" data={pg} />

          </div>

        </div>

        {/* HOSTEL */}
        <div className="px-4 md:px-8">

          <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-lg rounded-[2rem] shadow-xl border border-white/30 p-6 hover:shadow-2xl transition-all duration-300">

          <div className="flex justify-between items-center mb-5">

              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  🛏️ Hostel Near You
                </h2>

                <p className="text-gray-500 mt-1">
                  Affordable hostels for students
                </p>
              </div>

            </div>

            <PropertyRow title="" data={hostel} />

          </div>

        </div>

        {/* FLAT */}
        <div className="px-4 md:px-8">

          <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-lg rounded-[2rem] shadow-xl border border-white/30 p-6 hover:shadow-2xl transition-all duration-300">

            <div className="flex justify-between items-center mb-5">

              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  🏢 Flats Near You
                </h2>

                <p className="text-gray-500 mt-1">
                  Modern flats with premium amenities
                </p>
              </div>

            </div>

            <PropertyRow title="" data={flat} />

          </div>

        </div>

      </div>

      {/* CTA */}
      <CTASection/>

      {/* TESTIMONIAL */}
      <div className="relative z-10">
        <TestimonialSection />
      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}