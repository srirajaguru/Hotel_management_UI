import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function HotelCard({ hotel, onDelete }) {
  const role = useSelector((state) => state.hotels.role);
  return (
    <div className="hotel-card">
      <img
        src={hotel.image}
        alt={hotel.name}
        className="hotel-image"
      />
      <div className="hotel-card-content">
        <h3>{hotel.name}</h3>
        <p>{hotel.location}</p>
        <p>{hotel.description}</p>
        <h4>₹{Number(hotel.price).toLocaleString("en-IN")} / night</h4>
        <div className="hotel-card-actions">
          <Link to={`/hotel/${hotel.id}`}>View Details</Link>
          {role === "admin" && (
            <>
              <Link to={`/edit-hotel/${hotel.id}`}>Edit</Link>
              <button onClick={() => onDelete(hotel.id)}>
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
