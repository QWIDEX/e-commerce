import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: undefined,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setFavorites(state, action) {
      state.user.favorites = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser, setFavorites } = userSlice.actions;
