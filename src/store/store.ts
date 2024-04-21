import { configureStore } from "@reduxjs/toolkit";
import drinksSlice from "./reducers/drinkSlice";
import basketSlice from "./reducers/basketSlice";
import singleDrinkSlice from "./reducers/singleDrinkSlice";
import sizeAndCountSlice from "./reducers/sizeAndCountSlice";

export const store = configureStore({
  reducer: {
    drinksSlice,
    basketSlice,
    singleDrinkSlice,
    sizeAndCountSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
