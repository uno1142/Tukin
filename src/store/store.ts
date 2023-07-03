import { configureStore } from '@reduxjs/toolkit';
import gymReducer from '../features/gymSlice';

export const store = configureStore({
  reducer: {
    gym: gymReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
