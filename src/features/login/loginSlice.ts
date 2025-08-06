import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: { name: "", loggedIn: false },
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.login.loggedIn = true;
      state.login.name = action.payload.name;
    },
    logout: (state) => {
      state.login.loggedIn = false;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
