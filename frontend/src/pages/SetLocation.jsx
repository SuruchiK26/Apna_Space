import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useAuth } from "../context/AuthContext";

export default function SetLocation() {
  const { user, saveLocation, authLoading, error: authError, setError } = useAuth();
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(false); // General loading state
  const [locationError, setLocationError] = useState(""); // Specific location error
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Safely set initial position if user has location
    if (user?.location?.lat && user?.location?.lng) {
      setPosition({ lat: user.location.lat, lng: user.location.lng });
      setAddress(user.location.name || "Current location");
    }
  }, [user]);

  const fetchLocationFromBrowser = async () => {
    setLocationError("");
    setError("");

    // Check if geolocation is available
    if (!navigator?.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    try {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000, // 10 seconds timeout
          maximumAge: 300000, // 5 minutes cache
        });
      });

      const { latitude, longitude } = pos.coords;
      setPosition({ lat: latitude, lng: longitude });

      // Fetch address using reverse geocoding
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        if (!response.ok) throw new Error("Failed to fetch address");
        const data = await response.json();
        setAddress(data?.display_name || "Current location");
      } catch (addrErr) {
        console.warn("Unable to resolve address:", addrErr);
        setAddress("Current location");
        setLocationError("Unable to resolve address. You can enter manually.");
      }
    } catch (geoErr) {
      console.error("Geolocation error:", geoErr);
      let errorMessage = "Unable to access location.";
      if (geoErr.code === geoErr.PERMISSION_DENIED) {
        errorMessage = "Location permission denied. Please allow location access.";
      } else if (geoErr.code === geoErr.POSITION_UNAVAILABLE) {
        errorMessage = "Location information is unavailable.";
      } else if (geoErr.code === geoErr.TIMEOUT) {
        errorMessage = "Location request timed out.";
      }
      setLocationError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const searchAddress = async () => {
    setLocationError("");
    setError("");
    if (!address?.trim()) {
      setLocationError("Please enter an address to search.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      if (!response.ok) throw new Error("Search request failed");
      const results = await response.json();
      if (!results?.length) {
        setLocationError("Address not found. Try another location.");
        return;
      }
      const result = results[0];
      setPosition({
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon)
      });
      setAddress(result.display_name || address);
    } catch (err) {
      console.error("Address search error:", err);
      setLocationError("Unable to search address. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!position?.lat || !position?.lng || !address?.trim()) {
      setLocationError("Please select or enter a location before saving.");
      return;
    }

    setSaving(true);
    try {
      await saveLocation({
        lat: position.lat,
        lng: position.lng,
        address: address.trim()
      });
      navigate("/home");
    } catch (err) {
      console.error("Save location error:", err);
      setLocationError("Failed to save location. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const googleMapsApiKey = import.meta.env?.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-pink-600 mb-2">Set your location</h1>
        <p className="text-gray-500 mb-6">We need your location to show nearby PG and flat listings.</p>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <button
              type="button"
              onClick={fetchLocationFromBrowser}
              disabled={loading}
              className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Fetching location..." : "Use Current Location"}
            </button>

            <div>
              <label className="block text-gray-700 mb-2">Or enter address manually</label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-xl border border-gray-200 p-3 focus:border-pink-500 focus:outline-none"
                placeholder="Enter a location or landmark"
                disabled={loading}
              />
            </div>

            <button
              type="button"
              onClick={searchAddress}
              disabled={loading}
              className="w-full bg-white border border-pink-500 text-pink-500 py-3 rounded-xl font-semibold hover:bg-pink-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Searching..." : "Search address"}
            </button>

            {(locationError || authError) && (
              <p className="text-sm text-red-500">{locationError || authError}</p>
            )}

            <button
              type="button"
              onClick={handleSave}
              disabled={saving || loading || !position}
              className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving location..." : "Save location"}
            </button>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-pink-50 p-6">
            <h2 className="text-lg font-semibold mb-4">Your selected location</h2>
            {position ? (
              <>
                <div className="space-y-3 mb-4">
                  <p className="text-gray-700">
                    <span className="font-semibold">Address:</span> {address || "Unknown"}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Latitude:</span> {position.lat?.toFixed(5) || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Longitude:</span> {position.lng?.toFixed(5) || "N/A"}
                  </p>
                </div>
                <div className="h-72 rounded-3xl overflow-hidden border border-gray-200">
                  {googleMapsApiKey ? (
                    <LoadScript googleMapsApiKey={googleMapsApiKey}>
                      <GoogleMap
                        mapContainerStyle={{ width: "100%", height: "100%" }}
                        center={position}
                        zoom={14}
                      >
                        <Marker position={position} />
                      </GoogleMap>
                    </LoadScript>
                  ) : (
                    <div className="h-full flex items-center justify-center bg-gray-100 text-gray-500">
                      Map not available (API key missing)
                    </div>
                  )}
                </div>
              </>
            ) : (
              <p className="text-gray-500">No location selected yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
