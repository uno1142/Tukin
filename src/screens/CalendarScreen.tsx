// screens/CalendarScreen.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Calendar } from 'react-native-calendars';
import { selectTrainingLog } from '../features/gymSlice';
import { TrainingLog } from '../features/gymSlice';

const CalendarScreen: React.FC = () => {
  const trainingLog: TrainingLog[] = useSelector(selectTrainingLog);

  // TrainingLogをもとに、トレーニングがあった日を抽出します。
  const markedDates = trainingLog.reduce((dates, log) => {
    const date = new Date(log.startTime).toISOString().split('T')[0]; // 時刻部分を除去します。
    dates[date] = { marked: true }; // その日付にマークを付けます。
    return dates;
  }, {} as { [key: string]: { marked: boolean } });

  return <Calendar markedDates={markedDates} />;
};

export default CalendarScreen;
