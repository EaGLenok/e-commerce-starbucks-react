import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DrinkItem {
  id: number;
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
        (item) => item.id === action.payload.id
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
    removeFromBasket(state, action: PayloadAction<DrinkItem>) {
      const indexToRemove = state.itemsBasket.findIndex(
        (item) => item.id === action.payload.id
      );

      if (indexToRemove !== -1) {
        const updatedBasket = [
          ...state.itemsBasket.slice(0, indexToRemove),
          ...state.itemsBasket.slice(indexToRemove + 1),
        ];
        state.itemsBasket = updatedBasket;
      }
    },
    IncrementItem(state, action: PayloadAction<DrinkItem>) {
      const existingItemIndex = state.itemsBasket.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        const existingItem = state.itemsBasket[existingItemIndex];
        const updatedItem = {
          ...existingItem,
          count: existingItem.count + 1,
        };
        state.itemsBasket.splice(existingItemIndex, 1, updatedItem); // Обновляем элемент в массиве
      }
    },
    DecrementItem(state, action: PayloadAction<DrinkItem>) {
      const existingItemIndex = state.itemsBasket.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        const existingItem = state.itemsBasket[existingItemIndex];
        if (existingItem.count > 1) {
          const updatedItem = {
            ...existingItem,
            count: existingItem.count - 1,
          };
          state.itemsBasket.splice(existingItemIndex, 1, updatedItem); // Обновляем элемент в массиве
        }
      }
    },
  },
});

export const { addToBasket, removeFromBasket, IncrementItem, DecrementItem } =
  basketSlice.actions;

export default basketSlice.reducer;
