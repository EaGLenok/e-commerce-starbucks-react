import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface templateData {
  selectedSize: string;
  currentIce: string;
  currentPumps: number;
  currentTopping: string;
}

const initialState: templateData = {
  selectedSize: "SHORT",
  currentIce: "Ice",
  currentPumps: 1,
  currentTopping: "None",
};

export const templateDataSlice = createSlice({
  name: "sizes",
  initialState,
  reducers: {
    selectSize: (state, action: PayloadAction<string>) => {
      state.selectedSize = action.payload;
    },
    selectIce: (state, action: PayloadAction<string>) => {
      state.currentIce = action.payload;
    },
    incrementPumps: (state, action: PayloadAction<number>) => {
      if (state.currentPumps + 1 <= 12) {
        state.currentPumps += action.payload;
      }
    },
    decrementPumps: (state, action: PayloadAction<number>) => {
      if (state.currentPumps - 1 >= 1) {
        state.currentPumps -= action.payload;
      }
    },
    selectTopping: (state, action: PayloadAction<string>) => {
      state.currentTopping = action.payload;
    },
  },
});

export const {
  selectSize,
  selectIce,
  incrementPumps,
  decrementPumps,
  selectTopping,
} = templateDataSlice.actions;

export default templateDataSlice.reducer;
