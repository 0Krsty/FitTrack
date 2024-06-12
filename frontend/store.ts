// src/middleware/apiBatcher.ts
export const apiBatcher = (store: any) => (next: any) => (action: any) => {
  // Your logic to batch API calls
  // For example, collecting actions for a specified time before dispatching
  console.log('API Batching Middleware', action);
  next(action);
};
```

```typescript
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import fitnessReducer from './slices/fitnessSlice';
import { apiBatcher } from './middleware/apiBatcher'; // make sure the path is correct

const rootReducer = combineReducers({
  fitness: fitnessReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiBatcher),
  });
};