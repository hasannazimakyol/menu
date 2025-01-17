import { configureStore, createSlice } from "@reduxjs/toolkit";
import { loadAuthState, storeAuthState } from "./storage";

const authSlice = createSlice({
  name: "auth",
  initialState: loadAuthState(),
  reducers: {
    loginSuccess: (state, action) => {
      state.id = action.payload.user.id;
      state.username = action.payload.user.username;
      state.email = action.payload.user.email;
      state.image = action.payload.user.image;
    },
    logoutSuccess: (state) => {
      state.id = 0;
      delete state.username;
      delete state.email;
      delete state.image;
    },
    userUpdateSuccess: (state, action) => {
      state.username = action.payload.username;
      state.image = action.payload.image;
    },
  },
});

export const { loginSuccess, logoutSuccess, userUpdateSuccess } = authSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

store.subscribe(() => {
  storeAuthState(store.getState().auth);
});
