import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Details from "./pages/Details";
import AddProperty from "./pages/AddProperty";
import LocationPrompt from "./components/LocationPrompt";

function App() {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");

    if (savedLocation) {
      setUserLocation(JSON.parse(savedLocation));
    }
  }, []);

  const handleLocationSet = (locationData) => {
    setUserLocation(locationData);
  };

  if (!userLocation) {
    return (
      <LocationPrompt
        onLocationSet={handleLocationSet}
      />
    );
  }

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <Home
              userLocation={userLocation}
              setUserLocation={setUserLocation}
            />
          }
        />

        <Route
          path="/search"
          element={<Search />}
        />

        <Route
          path="/property/:id"
          element={<Details />}
        />

        <Route
          path="/add-property"
          element={<AddProperty />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;