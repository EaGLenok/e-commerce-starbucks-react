// basketSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DrinkItem {
  name: string;
  description: string;
  price: number;
  date_added: string;
  imageUrl: string;
  count: number;
  size: string;
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
      const existingItemIndex = state.itemsBasket.findIndex(
        (item) => item.imageUrl === action.payload.imageUrl
      );
      if (existingItemIndex !== -1) {
        const existingItem = state.itemsBasket[existingItemIndex];
        const updatedItem = {
          ...existingItem,
          count: existingItem.count + 1,
        };
        state.itemsBasket.splice(existingItemIndex, 1, updatedItem);
      } else {
        state.itemsBasket.push({ ...action.payload, count: 1 });
      }
    },
  },
});

export const { addToBasket } = basketSlice.actions;

export default basketSlice.reducer;
