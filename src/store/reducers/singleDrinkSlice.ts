import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface DrinkItem {
  id: number;
  name: string;
  description: string;
  flavor: string;
  topping: string[];
  priceSize?: {
    SHORT?: number;
    TALL?: number;
    GRANDE?: number;
    VENTI?: number;
    [key: string]: number | undefined;
  };
  date_added: string;
  imageUrl: string;
  count?: number;
}

interface DrinksState {
  item: DrinkItem[];
  status: "idle" | "loading" | "succesed" | "failed";
}

const initialState: DrinksState = {
  item: [],
  status: "idle",
};

export const fetchSingleDrink = createAsyncThunk(
  "drinks/fetchSingleDrink",
  async (params: { id: number }, _thunkApi) => {
    const { id } = params;
    const response = await axios.get(
      `https://65bb702652189914b5bc21bd.mockapi.io/starbucks-items?id=${id}`
    );
    return response.data;
  }
);

export const singleDrinkSlice = createSlice({
  name: "drink",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleDrink.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleDrink.fulfilled, (state, action) => {
        state.status = "succesed";
        state.item = action.payload;
      })
      .addCase(fetchSingleDrink.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default singleDrinkSlice.reducer;
