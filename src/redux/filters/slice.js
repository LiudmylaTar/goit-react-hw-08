import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filters",
  initialState: {
    name: "",
  },
  reducers: {
    changeContactSearch(state, action) {
      state.name = action.payload;
    },
  },
});

export const { changeContactSearch } = filterSlice.actions;
export default filterSlice.reducer;
