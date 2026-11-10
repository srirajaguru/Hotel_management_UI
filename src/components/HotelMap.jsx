import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow
});
function MapBounds({ hotelPosition, userPosition }) {
  const map = useMap();
  useEffect(() => {
    const positions = userPosition
      ? [hotelPosition, userPosition]
      : [hotelPosition];
    map.fitBounds(positions, { padding: [40, 40] });
  }, [hotelPosition, userPosition, map]);
  return null;
}
function HotelMap({ latitude, longitude, hotelName }) {
  const [userPosition, setUserPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const hotelPosition = [
    Number(latitude),
    Number(longitude)
  ];
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setLoading(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserPosition([latitude, longitude]);
        setLoading(false);
      },
      (error) => {
        switch (error.code) {
          case 1:
            setError("Location permission denied.");
            break;
          case 2:
            setError("Location information unavailable.");
            break;
          case 3:
            setError("Location request timed out.");
            break;
          default:
            setError("Unable to get your location.");
        }
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };
  return (
    <div>
      <button
  type="button"
  className="btn btn-primary map-button"
  onClick={getUserLocation}
  disabled={loading}
>
  {loading ? "Getting Location..." : "Get My Location"}
</button>
      {error && <p>{error}</p>}
      {userPosition && (
        <p>
          Your Location: {userPosition[0].toFixed(5)},
          {userPosition[1].toFixed(5)}
        </p>
      )}
      <MapContainer
        center={hotelPosition}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "350px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={hotelPosition}>
          <Popup>{hotelName}</Popup>
        </Marker>
        {userPosition && (
          <Marker position={userPosition}>
            <Popup>Your Current Location</Popup>
          </Marker>
        )}
        <MapBounds
          hotelPosition={hotelPosition}
          userPosition={userPosition}
        />
      </MapContainer>
    </div>
  );
}

export default HotelMap;
