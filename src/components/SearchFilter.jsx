function SearchFilter({
  searchTerm,
  setSearchTerm,
  location,
  setLocation,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sort,
  setSort,
  locations,
  onReset
}) {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search hotels or destinations..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={location} onChange={(e) => setLocation(e.target.value)}>
        <option value="">All Locations</option>
        {locations.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Minimum price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Maximum price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort By</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
        <option value="az">Name: A to Z</option>
        <option value="za">Name: Z to A</option>
      </select>
      <button type="button" onClick={onReset}>Reset</button>
    </div>
  );
}

export default SearchFilter;