import { configureStore, createSlice } from '@reduxjs/toolkit';

// A simple slice just to fulfill the Redux requirement 
// without violating the useReducer requirement for favourites.
const appSlice = createSlice({
  name: 'app',
  initialState: {
    initialized: true,
  },
  reducers: {
    setInitialized: (state, action) => {
      state.initialized = action.payload;
    },
  },
});

export const { setInitialized } = appSlice.actions;

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});
