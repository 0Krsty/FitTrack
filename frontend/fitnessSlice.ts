import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FitnessActivity {
  id: string;
  name: string;
  duration: number;
  intensity: string;
}

type FitnessActivityState = FitnessActivity[];

const initialState: FitnessActivityState = [];

const fitnessActivitiesSlice = createSlice({
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
      if (index !== -if) {
        state.splice(index, 1);
      }
    },
    filterActivitiesByIntensity: {
      reducer(state, { payload }: PayloadAction<{ intensity: string }>) {
        return state.filter(activity => activity.intensity === payload.intensity);
      },
      prepare(intensity: string) {
        return { payload: { intensity } };
      }
    },
  },
});

export const { addActivity, updateActivity, removeActivity, filterActivitiesByIntensity } = fitnessActivitiesxEslice.actions;

export default fitnessActivitiesSlice.reducer;