import { createSlice } from "@reduxjs/toolkit";

export const meDataSlice = createSlice({
  initialState: null,
  name: "meData",
  reducers: {
    setMeData(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { setMeData } = meDataSlice.actions;
export default meDataSlice.reducer;
