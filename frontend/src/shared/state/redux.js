import { configureStore, createSlice } from "@reduxjs/toolkit";
import { loadAuthState, storeAuthState } from "./storage";

const authSlice = createSlice({
  name: "auth",
  initialState: loadAuthState(),
  reducers: {
    loginSuccess: (state, action) => {
      state.username = action.payload.user.username;
      state.id = action.payload.user.id;
      state.email = action.payload.user.email;
      state.image = action.payload.user.image;
      state.isAdmin = action.payload.user.roles.find(o => o.name === 'ADMIN') == null ? false : true;
    },
    logoutSuccess: (state) => {
      state.id = 0;
      delete state.username;
      delete state.email;
      delete state.image;
      delete state.isAdmin;
    },
    userUpdateSuccess: (state, action) => {
      state.username = action.payload.username;
      state.image = action.payload.image;
    },
  },
});

export const { loginSuccess, logoutSuccess, userUpdateSuccess } = authSlice.actions;

const languageSlice = createSlice({
  name: "language",
  initialState: {
    languages: [],
    // selectedLanguage: "en",
  },
  reducers: {
    loadLanguages: (state, action) => {
      state.languages = action.payload;
    },
  },
  // reducers: {
  //   setSelectedLanguage: (state, action) => {
  //     state.selectedLanguage = action.payload;
  //   },
  // },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchLanguages.fulfilled, (state, action) => {
  //     state.languages = action.payload;
  //   });
  // },
});

export const { loadLanguages } = languageSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    language: languageSlice.reducer
  },
});

store.subscribe(() => {
  storeAuthState(store.getState().auth);
});
