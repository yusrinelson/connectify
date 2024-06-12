// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
//   devTools: import.meta.env.MODE !== 'production', // Enable DevTools only in development
});

export default store;
