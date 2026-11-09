
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../redux/hotelSlice";
function Navbar() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.hotels.role);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="logo">
          <img src="/logo.svg" alt="TripNest" />
        </Link>
      </div>
      <div className="navbar-tagline">
        Perfect for hotel discovery and booking.
      </div>

      <div className="navbar-links">
        {role === "admin" && (
          <Link to="/add-hotel" className="btn btn-primary">
            + Add Hotel
          </Link>
        )}
        <label>Role:</label>

        <select
          value={role}
          onChange={(e) => dispatch(setRole(e.target.value))}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </nav>
  );
}

export default Navbar;
