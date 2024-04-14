import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface DrinkItem {
  name: string;
  description: string;
  price: number;
  date_added: string;
  imageUrl: string;
}

interface DrinksState {
  items: DrinkItem[];
  status: "idle" | "loading" | "succesed" | "failed";
}

const initialState: DrinksState = {
  items: [],
  status: "idle",
};

export const fetchDrinks = createAsyncThunk("drinks/fetchDrinks", async () => {
  const response = await axios.get(
    "https://65bb702652189914b5bc21bd.mockapi.io/starbucks-items"
  );
  return response.data;
});

export const drinksSlice = createSlice({
  name: "drinks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrinks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDrinks.fulfilled, (state, action) => {
        state.status = "succesed";
        state.items = action.payload;
      })
      .addCase(fetchDrinks.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default drinksSlice.reducer;