import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    avatar: "",
    name: "",
    surname: "",
  },
});
