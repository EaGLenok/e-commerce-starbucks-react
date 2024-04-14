import { configureStore } from "@reduxjs/toolkit";
import drinksSlice from "./reducers/drinkSlice";

export const store = configureStore({
  reducer: {
    drinksSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
