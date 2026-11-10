import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddHotel from "./pages/AddHotel";
import EditHotel from "./pages/EditHotel";
import HotelDetails from "./pages/HotelDetails";
import NotFound from "./pages/NotFound";

function App() {
  const role = useSelector((state) => state.hotels.role);

  return (
    <>
      <Navbar />
      <main className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-hotel"
            element={role === "admin" ? <AddHotel /> : <Navigate to="/" replace />}/>
          <Route path="/edit-hotel/:id" 
            element={role === "admin" ? <EditHotel /> : <Navigate to="/" replace />}/>
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
