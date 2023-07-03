import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        // トレーニング終了時、ログを更新する
        const log = state.trainingLog[state.trainingLog.length - 1];
        let startTime = new Date(log.startTime);
        let endTime = new Date();
        let diff = Math.abs(endTime.getTime() - startTime.getTime());
        let diffInMinutes = Math.floor(diff / 1000 / 60);
        log.endTime = endTime.toISOString();
        log.totalTime = diffInMinutes.toString();
        state.selectedParts = [];

        // 退筋時、AsyncStorageに保存する
        AsyncStorage.setItem('gymState', JSON.stringify(state));
      } else {
        // トレーニング開始時、ログをプッシュする
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
    setTrainingLog(state, action: PayloadAction<TrainingLog[]>) {
      state.trainingLog = action.payload;
      // ステートが更新されたらAsyncStorageに保存します
      AsyncStorage.setItem('gymState', JSON.stringify(state));
    },
    addTrainingLog: (state, action: PayloadAction<TrainingLog>) => {
      state.trainingLog.push(action.payload);
      AsyncStorage.setItem('gymState', JSON.stringify(state));
    },
    clearTrainingLog: (state) => {
      state.trainingLog = [];
      AsyncStorage.setItem('gymState', JSON.stringify(state));
    },
  },
});

export const {
  selectPart,
  deselectPart,
  toggleTraining,
  setTrainingLog,
  addTrainingLog,
  clearTrainingLog,
} = gymSlice.actions;

export const selectParts = (state: RootState) => state.gym.selectedParts;
export const selectIsTraining = (state: RootState) => state.gym.isTraining;
export const selectTrainingLog = (state: RootState) => state.gym.trainingLog;

export default gymSlice.reducer;
