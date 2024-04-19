import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SizesState {
  selectedSize: string;
}

const initialState: SizesState = {
  selectedSize: "SHORT",
};

export const sizesSlice = createSlice({
  name: "sizes",
  initialState,
  reducers: {
    selectSize: (state, action: PayloadAction<string>) => {
      state.selectedSize = action.payload;
    },
  },
});

export const { selectSize } = sizesSlice.actions;

export default sizesSlice.reducer;
