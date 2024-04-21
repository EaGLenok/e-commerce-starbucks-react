import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SizesCountState {
  selectedSize: string;
  count: number;
}

const initialState: SizesCountState = {
  selectedSize: "SHORT",
  count: 1,
};

export const sizeAndCountSlice = createSlice({
  name: "sizes",
  initialState,
  reducers: {
    selectSize: (state, action: PayloadAction<string>) => {
      state.selectedSize = action.payload;
    },
    updateCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
  },
});

export const { selectSize, updateCount } = sizeAndCountSlice.actions;

export default sizeAndCountSlice.reducer;
