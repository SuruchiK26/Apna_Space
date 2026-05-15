import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function Map({ properties }) {

  const center = properties[0]?.coordinates || {
    lat: 21.1938,
    lng: 81.3509
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>

      <GoogleMap
        center={center}
        zoom={13}
        mapContainerStyle={{ width: "100%", height: "400px" }}
      >

        {properties.map((p) => (
          <Marker
            key={p._id}
            position={p.coordinates}
          />
        ))}

      </GoogleMap>

    </LoadScript>
  );
}