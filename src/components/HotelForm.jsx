
import { useEffect, useState } from "react";

function HotelForm({ initialData, onSubmit, submitLabel }) {
  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    price: "",
    latitude: "",
    longitude: "",
    image: ""
  });
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5 MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setForm({ ...form, image: reader.result });
    };
    reader.readAsDataURL(file);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.name.trim() ||
      !form.location.trim() ||
      !form.description.trim() ||
      !form.price ||
      !form.latitude ||
      !form.longitude ||
      !form.image
    ) {
      alert("Please fill all fields");
      return;
    }
    if (Number(form.price) <= 0) {
      alert("Price must be greater than zero");
      return;
    }
    if (
      Number(form.latitude) < -90 ||
      Number(form.latitude) > 90
    ) {
      alert("Invalid latitude");
      return;
    }
    if (
      Number(form.longitude) < -180 ||
      Number(form.longitude) > 180
    ) {
      alert("Invalid longitude");
      return;
    }
    onSubmit({
      ...form,
      name: form.name.trim(),
      location: form.location.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      latitude: Number(form.latitude),
      longitude: Number(form.longitude)
    });
  };

  return (
    <form className="hotel-form" onSubmit={handleSubmit}>
      <label>Hotel Name</label>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Enter hotel name"
      />
      <label>Location</label>
      <input
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Enter city"
      />
      <label>Description</label>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Enter hotel description"
      />
      <label>Price per night (₹)</label>
      <input
        type="number"
        min="1"
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Enter price"
      />
      <label>Latitude</label>
      <input
        type="number"step="any"
        name="latitude"
        value={form.latitude}
        onChange={handleChange}
        placeholder="Enter latitude"
      />
      <label>Longitude</label>
      <input
        type="number"
        step="any"
        name="longitude"
        value={form.longitude}
        onChange={handleChange}
        placeholder="Enter longitude"
      />
      <label>Hotel Image</label>
      <input type="file" accept="image/*" onChange={handleImage} />
      {form.image && (
        <img
          src={form.image}
          alt="Hotel preview"
          className="image-preview"
        />
      )}
      <button type="submit">{submitLabel}</button>
    </form>
  );
}

export default HotelForm;
