import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

export interface TrainingLog {
  startTime: string;
  endTime: string;
  totalTime: string;
  parts: string[];
}

export interface GymState {
  selectedParts: string[];
  isTraining: boolean;
  trainingLog: TrainingLog[];
}

const initialState: GymState = {
  selectedParts: [],
  isTraining: false,
  trainingLog: [],
};

export const gymSlice = createSlice({
  name: 'gym',
  initialState,
  reducers: {
    selectPart: (state, action: PayloadAction<string>) => {
      state.selectedParts.push(action.payload);
    },
    deselectPart: (state, action: PayloadAction<string>) => {
      state.selectedParts = state.selectedParts.filter((part) => part !== action.payload);
    },
    toggleTraining: (state) => {
      if (state.isTraining) {
        // If ending training, update the last log
        const log = state.trainingLog[state.trainingLog.length - 1];
        log.endTime = new Date().toISOString();
        log.totalTime = ''; // Compute this based on startTime and endTime
      } else {
        // If starting training, create new log with start time
        const log = {
          startTime: new Date().toISOString(),
          endTime: '',
          totalTime: '',
          parts: [...state.selectedParts],
        };
        state.trainingLog.push(log);
      }
      state.isTraining = !state.isTraining;
    },
  },
});

export const { selectPart, deselectPart, toggleTraining } = gymSlice.actions;

export const selectParts = (state: RootState) => state.gym.selectedParts;
export const selectIsTraining = (state: RootState) => state.gym.isTraining;
export const selectTrainingLog = (state: RootState) => state.gym.trainingLog;

export default gymSlice.reducer;
