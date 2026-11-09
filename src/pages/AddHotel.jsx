
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import HotelForm from "../components/HotelForm";
import { addHotel } from "../redux/hotelSlice";

function AddHotel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddHotel = (data) => {
    dispatch(addHotel(data));
    alert("Hotel added successfully!");
    navigate("/");
  };
  return (
    <>
      <Helmet>
        <title>Add Hotel | TripNest</title>
      </Helmet>
      <section className="form-page">
        <h1>Add New Hotel</h1>
        <p className="form-subtitle">Enter your hotel information.</p>
        <HotelForm
          onSubmit={handleAddHotel}
          submitLabel="Add Hotel"
        />
      </section>
    </>
  );
}
export default AddHotel;
