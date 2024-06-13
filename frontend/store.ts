// src/middleware/apiBatcher.ts

function logMessage(message: string, data: any) {
  console.log(`${message}:`, data);
}

export const apiBatcher = (store: any) => (next: any) (action: any) => {
  logMessage('API Batching Middleware triggered with action', action);

  next(action);
};
```

```typescript
// src/store/setupStore.ts
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import fitnessReducer from './slices/fitnessSlice';
import { apiBatcher } from './middleware/apiBatcher';

const rootReducer = combineReducers({
    fitness: fitnessReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiBatcher),
  });
};