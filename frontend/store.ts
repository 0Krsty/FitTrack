import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import fitnessReducer from './slices/fitnessSlice';

const rootReducer = combineReducers({
  fitness: fitnessReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];