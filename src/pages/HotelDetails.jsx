import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import HotelMap from "../components/HotelMap";
function HotelDetails() {
  const { id } = useParams();
  const hotel = useSelector((state) =>
    state.hotels.list.find((item) => item.id === Number(id))
  );
  if (!hotel) {
    return (
      <div className="empty-state">
        <h1>Hotel Not Found</h1>
        <Link to="/" className="btn btn-primary">
          Back to Hotels
        </Link>
      </div>
    );
  }
  const locationUrl =
    `https://www.openstreetmap.org/?mlat=${hotel.latitude}` +
    `&mlon=${hotel.longitude}#map=16/${hotel.latitude}/${hotel.longitude}`;
  return (
    <>
      <Helmet>
        <title>{hotel.name} | TripNest</title>
        <meta name="description" content={hotel.description} />
      </Helmet>
      <div className="details-page">
        <Link to="/" className="btn btn-secondary back-button">
          ← Back to Hotels
        </Link>
        <div className="hotel-details">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="details-image"
          />
          <div className="details-content">
            <h1>{hotel.name}</h1>
            <p>{hotel.location}</p>
            <h2>
              ₹{Number(hotel.price).toLocaleString("en-IN")} / night
            </h2>
            <p>{hotel.description}</p>
            <div className="coordinates">
              <p><strong>Latitude:</strong> {hotel.latitude}</p>
              <p><strong>Longitude:</strong> {hotel.longitude}</p>
            </div>
            <div className="hotel-location">
              <h2>Hotel Location</h2>
              <HotelMap
                latitude={hotel.latitude}
                longitude={hotel.longitude}
                hotelName={hotel.name}
              />
            </div> 
            <div className="details-actions">
              <Link to="/" className="btn btn-secondary">
                Back to Hotels
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HotelDetails;
