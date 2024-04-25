import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DrinkItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  flavor: string;
  count: number;
  size: string;
  currentIce: string;
  currentPumps: number;
  currentTopping: string;
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
          currentTopping: (existingItem.currentTopping =
            action.payload.currentTopping),
          currentIce: (existingItem.currentIce = action.payload.currentIce),
          currentPumps: (existingItem.currentPumps =
            action.payload.currentPumps),
          size: (existingItem.size = action.payload.size),
          price: (existingItem.price = action.payload.price),
          count: existingItem.count + action.payload.count,
        };
        state.itemsBasket.splice(existingItemIndex, 1, updatedItem);
      } else {
        state.itemsBasket.push({
          ...action.payload,
          currentTopping: action.payload.currentTopping,
          currentPumps: action.payload.currentPumps,
          currentIce: action.payload.currentIce,
          size: action.payload.size,
          count: action.payload.count,
        });
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
        state.itemsBasket.splice(existingItemIndex, 1, updatedItem);
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
          state.itemsBasket.splice(existingItemIndex, 1, updatedItem);
        }
      }
    },
  },
});

export const { addToBasket, removeFromBasket, IncrementItem, DecrementItem } =
  basketSlice.actions;

export default basketSlice.reducer;
