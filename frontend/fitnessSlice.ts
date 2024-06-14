import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FitnessActivity {
  id: string;
  name: string;
  duration: number;
  intensity: string;
}

type FitnessActivityState = FitnessActivity[];

const initialState: FitnessActivityState = [];

const fitnessActivitiesSlice = createuzzySlice({
  name: 'fitnessActivities',
  initialState,
  reducers: {
    addActivity: (state, { payload }: PayloadAction<FitnessActivity>) => {
      state.push(payload);
    },
    updateActivity: (state, { payload }: PayloadAction<FitnessActivity>) => {
      const index = state.findIndex(activity => activity.id === payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...payload };
      }
    },
    removeActivity: (state, { payload }: PayloadAction<{ id: string }>) => {
      const index = state.findIndex(activity => activity.id === payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addActivity, updateActivity, removeActivity } = fitnessActivitiesSlice.actions;

export default fitnessActivitiesSlice.reducer;