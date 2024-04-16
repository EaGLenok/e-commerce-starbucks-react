import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DrinkItem {
  name: string;
  description: string;
  price: number;
  date_added: string;
  imageUrl: string;
  count: number;
}

interface DrinksState {
  itemsBasket: DrinkItem[];
}

const initialState: DrinksState = {
  itemsBasket: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket(state, action: PayloadAction<DrinkItem>) {
      const existingItem = state.itemsBasket.find(
        (itemsBasket) => itemsBasket.imageUrl === action.payload.imageUrl
      );
      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.itemsBasket.push({ ...action.payload, count: 1 });
      }
    },
  },
});

export const { addToBasket } = basketSlice.actions;

export default basketSlice.reducer;
