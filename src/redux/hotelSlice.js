import { createSlice } from "@reduxjs/toolkit";
import initialHotels from "../data/hotels";

const hotelSlice = createSlice({
  name: "hotels",
  initialState: {
    list: initialHotels,
    role: "user",
    searchTerm: ""
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    addHotel: (state, action) => {
      state.list.push({
        ...action.payload,
        id: Date.now(),
        rating: 0
      });
    },

    updateHotel: (state, action) => {
      const index = state.list.findIndex(
        (hotel) => hotel.id === action.payload.id
      );

      if (index !== -1) {
        state.list[index] = {
          ...state.list[index],
          ...action.payload
        };
      }
    },

    deleteHotel: (state, action) => {
      state.list = state.list.filter(
        (hotel) => hotel.id !== action.payload
      );
    }
  }
});

export const {
  setRole,
  setSearchTerm,
  addHotel,
  updateHotel,
  deleteHotel
} = hotelSlice.actions;

export default hotelSlice.reducer;