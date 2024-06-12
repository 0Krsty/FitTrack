import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FitnessActivity {
  id: string;
  name: string;
  duration: number;
  intensity: string;
}

interface FitnessActivitiesState {
  activities: FitnessActivity[];
}

const initialState: FitnessActivity[] = [];

const fitnessActivitiesSlice = createSlice({
  name: 'fitnessActivities',
  initialState,
  reducers: {
    addActivity: (state, action: PayloadAction<FitnessActivity>) => {
      state.push(action.payload);
    },
    updateActivity: (state, action: PayloadAction<FitnessActivity>) => {
      const { id, name, duration, intensity } = action.payload;
      const existingActivity = state.find(activity => activity.id === id);
      if (existingActivity) {
        existingActivity.name = name;
        existingActivity.duration = duration;
        existingActivity.intensity = intensity;
      }
    },
    removeActivity: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex(activity => activity.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addActivity, updateActivity, removeActivity } = fitnessActivitiesSlice.actions;

export default fitnessActivitiesScheme.reducer;