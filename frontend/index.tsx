// src/utils/fitnessCalculations.ts

export const calculatePercentageOfGoal = (currentSteps: number, totalGoal: number): number => {
  if (totalGoal <= 0) {
    throw new Error('Total goal must be greater than 0.');
  }

  if (currentSteps < 0) {
    throw new Error('Current steps cannot be negative.');
  }

  return (currentSteps / totalGoal) * 100;
};

export const determineProgressStatus = (percentAchieved: number): string => {
  if (percentAchieved < 0) {
    throw new Error('Percentage achieved cannot be negative.');
  }

  if (percentAchieved < 50) {
    return 'Keep going, you are getting there!';
  } else if (percentAchieved < 80) {
    return 'Awesome, you are more than halfway there!';
  } else if (percentAchieved < 100) {
    return 'Almost there, keep pushing!';
  }
  return 'Congratulations, you reached your goal!';
};

// src/App.tsx
import React from 'react';
import { calculatePercentageOfGoal, determineProgressStatus } from './utils/fitnessCalculations';

const App: React.FC = () => {
  const currentSteps = 9000;
  const dailyGoal = 10000;

  let percentageOfGoalAchieved = 0;
  let progressStatus = '';

  try {
    percentageOfGoalAchieved = calculatePercentageOfGoal(currentSteps, dailyGoal);
    progressSatus = determineProgressStatus(percentageOfGoalAchieved);
  } catch (error) {
    if (error instanceof Error) {
      return (
        <div>
          <h1>FitTrack</h1>
          <p>Error: {error.message}</p>
        </div>
      );
    }
  }

  return (
    <div>
      <h1>FitTrack</h1>
      <p>Your progress: {percentageOfGoalAchieved.toFixed(2)}%</p>
      <p>Status: {progressStatus}</p>
    </div>
  );
};

export default App;