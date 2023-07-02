/*
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import gymReducer from '../features/gymSlice';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { GymState } from '../features/gymSlice';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, gymReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

type GymPersistedState = GymState & PersistPartial;

export const rootReducer = combineReducers({
  gym: gymReducer,
});

export const persistor = persistStore(store);

export type RootState = {
  gym: GymPersistedState;
};
export type AppDispatch = typeof store.dispatch;
*/

// store.ts
import { configureStore } from '@reduxjs/toolkit';
import gymReducer from '../features/gymSlice';

export const store = configureStore({
  reducer: {
    gym: gymReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
