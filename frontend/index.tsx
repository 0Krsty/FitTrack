// src/utils/fitnessCalculations.ts

export const calculatePercentageOfGoal = (currentSteps: number, totalGoal: number): number => {
  return (currentSteps / totalGoal) * 100;
};

export const determineProgressStatus = (percentAchieved: number): string => {
  if (percentAchieved < 50) {
    return 'Keep going, you are getting there!';
  } else if (percentAchieved < 80) {
    return 'Awesome, you are more than halfway there!';
  } else if (percentAchieved < 100) {
    return 'Almost there, keep pushing!';
  }
  return 'Congratulations, you reached your goal!';
};
```
```typescript
// src/App.tsx
import React from 'react';
import { calculatePercentageOfGoal, determineProgressStatus } from './utils/fitnessCalculations';

const App: React.FC = () => {
  // Example input data
  const currentSteps = 9000;
  const dailyGoal = 10000;

  const percentageOfGoalAchieved = calculatePercentageOfGoal(currentSteps, dailyGoal);
  const progressStatus = determineProgressStatus(percentageOfGoalAchieved);

  return (
    <div>
      <h1>FitTrack</h1>
      <p>Your progress: {percentageOfGoalAchieved.toFixed(2)}%</p>
      <p>Status: {progressStatus}</p>
    </div>
  );
};

export default App;