// src/App.tsx

import React from 'react';

// Hypothetical complex function
const calculateFitnessProgress = (steps: number, goal: number) => {
  const percentageOfGoalReached = (steps / goal) * 100;
  let status = '';
  
  if (percentageOfGoalReached < 50) {
    status = 'Keep going, you are getting there!';
  } else if (percentageOfGoalReached < 80) {
    status = 'Awesome, you are more than halfway there!';
  } else if (percentageOfGoalReached < 100) {
    status = 'Almost there, keep pushing!';
  } else {
    status = 'Congratulations, you reached your goal!';
  }

  return { percentageOfGoalReached, status };
};

const App: React.FC = () => {
  const steps = 9000;
  const goal = 10000;
  const { percentageOfGoalReached, status } = calculateFitnessProgress(steps, goal);

  return (
    <div>
      <h1>FitTrack</h1>
      <p>Your progress: {percentageOfGoalReached.toFixed(2)}%</p>
      <p>Status: {status}</p>
    </div>
  );
};

export default App;
```
```typescript
// src/utils/fitnessCalculations.ts

export const calculateProgressPercentage = (current: number, goal: number): number => {
  return (current / goal) * 100;
};

export const getStatusMessage = (percentageOfGoalReached: number): string => {
  if (percentageOfGoalReached < 50) {
    return 'Keep going, you are getting there!';
  } else if (percentageOfGoalReached < 80) {
    return 'Awesome, you are more than halfway there!';
  } else if (percentageOfGoalReached < 100) {
    return 'Almost there, keep pushing!';
  }
  return 'Congratulations, you reached your goal!';
};
```
```typescript
// src/App.tsx
import React from 'react';
import { calculateProgressPercentage, getStatusMessage } from './utils/fitnessCalculations';

const App: React.FC = () => {
  const steps = 9000;
  const goal = 10000;

  const percentageOfGoalReached = calculateProgressPercentage(steps, goal);
  const status = getStatusMessage(percentageOfGoalReached);

  return (
    <div>
      <h1>FitTrack</h1>
      <p>Your progress: {percentageOfGoalReached.toFixed(2)}%</p>
      <p>Status: {status}</p>
    </div>
  );
};

export default App;