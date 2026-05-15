import { useState } from "react";

export default function LocationPrompt({ onLocationSet }) {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUseCurrentLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Reverse geocoding using Nominatim
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
            );
            const data = await response.json();
            if (data && data.display_name) {
              const locData = {
                address: data.display_name,
                coordinates: { lat: latitude, lng: longitude }
              };
              localStorage.setItem("userLocation", JSON.stringify(locData));
              onLocationSet(locData);
            } else {
              alert("Could not fetch address. Please enter manually.");
              setLoading(false);
            }
          } catch (error) {
            console.error("Error fetching address:", error);
            alert("Error fetching address. Please enter manually.");
            setLoading(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your location. Please enter manually.");
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser. Please enter manually.");
      setLoading(false);
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      const locData = {
        address: location,
        coordinates: null // No coordinates for manual entry
      };
      localStorage.setItem("userLocation", JSON.stringify(locData));
      onLocationSet(locData);
    } else {
      alert("Please enter a location.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-100 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="h-16 w-16 bg-pink-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl">📍</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to ApnaSpace</h1>
          <p className="text-gray-600">Please set your location to find properties near you</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleUseCurrentLocation}
            disabled={loading}
            className="w-full bg-pink-500 text-white py-3 px-6 rounded-3xl font-medium hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Getting Location..." : "Use Current Location"}
          </button>

          <div className="text-center text-gray-500">or</div>

          <form onSubmit={handleManualSubmit} className="space-y-4">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your city or location"
              className="w-full px-4 py-3 border border-pink-200 rounded-3xl bg-pink-50/80 focus:outline-none focus:ring-2 focus:ring-pink-200"
              required
            />
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-3 px-6 rounded-3xl font-medium hover:bg-gray-900 transition"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}