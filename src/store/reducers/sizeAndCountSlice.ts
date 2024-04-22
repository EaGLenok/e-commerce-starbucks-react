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
    DecrementCount: (state, action: PayloadAction<number>) => {
      state.count -= 1;
    },
    IncrementCount: (state, action: PayloadAction<number>) => {
      state.count += 1;
    },
  },
});

export const { selectSize, DecrementCount, IncrementCount } =
  sizeAndCountSlice.actions;

export default sizeAndCountSlice.reducer;
