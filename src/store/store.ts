import { configureStore } from "@reduxjs/toolkit";
import drinksSlice from "./reducers/drinkSlice";
import basketSlice from "./reducers/basketSlice";

export const store = configureStore({
  reducer: {
    drinksSlice,
    basketSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
