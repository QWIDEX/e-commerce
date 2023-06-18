import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      email: "",
      avatar: undefined,
      name: "",
      surname: "",
    },
  },
  reducers: {
    setUser(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
