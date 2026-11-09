
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import HotelForm from "../components/HotelForm";
import { updateHotel } from "../redux/hotelSlice";

function EditHotel() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hotel = useSelector((state) =>
    state.hotels.list.find((item) => item.id === Number(id))
  );
  if (!hotel) {
    return <h2>Hotel Not Found</h2>;
  }
  const handleUpdate = (data) => {
    dispatch(updateHotel({ ...data, id: hotel.id }));
    alert("Hotel updated successfully!");
    navigate("/");
  };
  return (
    <>
      <Helmet>
        <title>Edit Hotel | TripNest</title>
      </Helmet>
      <section className="form-page">
        <h1>Edit Hotel</h1>
        <p className="form-subtitle">Update your hotel information.</p>
        <HotelForm
          initialData={hotel}
          onSubmit={handleUpdate}
          submitLabel="Update Hotel"
        />
      </section>
    </>
  );
}

export default EditHotel;
