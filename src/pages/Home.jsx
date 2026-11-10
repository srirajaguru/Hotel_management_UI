import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { deleteHotel, setSearchTerm } from "../redux/hotelSlice";
import HotelCard from "../components/HotelCard";
import SearchFilter from "../components/SearchFilter";
import Pagination from "../components/Pagination";
function Home() {
  const dispatch = useDispatch();
  const hotels = useSelector((state) => state.hotels.list);
  const searchTerm = useSelector((state) => state.hotels.searchTerm);
  const role = useSelector((state) => state.hotels.role);
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 6;
  const locations = [...new Set(hotels.map((hotel) => hotel.location))];
  let filteredHotels = hotels.filter((hotel) => {
    const matchesSearch =
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation =
      location === "" || hotel.location === location;
    const matchesMin =
      minPrice === "" || hotel.price >= Number(minPrice);
    const matchesMax =
      maxPrice === "" || hotel.price <= Number(maxPrice);
    return matchesSearch && matchesLocation && matchesMin && matchesMax;
  });

  if (sort === "low") {
    filteredHotels.sort((a, b) => a.price - b.price);}

  if (sort === "high") {
    filteredHotels.sort((a, b) => b.price - a.price);}

  if (sort === "az") {
    filteredHotels.sort((a, b) => a.name.localeCompare(b.name));}

  if (sort === "za") {
    filteredHotels.sort((a, b) => b.name.localeCompare(a.name));}

  const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);
  const startIndex = (currentPage - 1) * hotelsPerPage;
  const displayedHotels = filteredHotels.slice(
    startIndex,
    startIndex + hotelsPerPage
  );
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, location, minPrice, maxPrice, sort]);
  useEffect(() => {
    if (currentPage > Math.max(totalPages, 1)) {
      setCurrentPage(Math.max(totalPages, 1));
    }
  }, [currentPage, totalPages]);
  const handleReset = () => {
    dispatch(setSearchTerm(""));
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
    setSort("");
    setCurrentPage(1);
  };
  const handleDelete = (id) => {
    if (role === "admin" && window.confirm("Delete this hotel?")) {
      dispatch(deleteHotel(id));
      alert("Hotel deleted successfully!");
    }
  };
  return (
    <>
      <Helmet>
        <title>TripNest | Explore Hotels</title>
        <meta name="description" content="Find and explore hotels." />
      </Helmet>
      <section className="home-page">
        <div className="page-header">
          <h1>Explore Hotels</h1>
          <p>Find the perfect place for your next stay.</p>
        </div>
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={(value) => dispatch(setSearchTerm(value))}
          location={location}
          setLocation={setLocation}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          sort={sort}
          setSort={setSort}
          locations={locations}
          onReset={handleReset}
        />
        <p className="result-count">
          {filteredHotels.length} hotels found
        </p>
        {displayedHotels.length > 0 ? (
          <div className="hotel-grid">
            {displayedHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>No hotels found</h2>
            <p>Try changing your search or filters.</p>
          </div>
        )}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}
      </section>
    </>
  );
}

export default Home;
