// src/middleware/apiBatcher.ts
function logMessage(message: string, data: any) {
  console.log(`${ message }:`, data);
}

const BATCH_TIME = 50; // Milliseconds to wait before dispatching the batch
let actionQueue: any[] = [];
let timeoutId: ReturnType<typeof setTimeout> | null = null;

export const apiBatcher = (store: any) => (next: any) => (action: any) => {
  logMessage("API Batching Middleware triggered with action", action);

  if (action.type.includes('API_CALL')) {
    actionQueue.push(action);
    
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        const batchedAction = {
          type: 'BATCH_API_CALLS',
          payload: actionQueue.map(a => a.payload),
        };
        next(batchedAction);
        actionQueue = [];
        timeoutID = null;
      }, BATCH_TIME);
    }
    return; 
  }

  next(action);
};