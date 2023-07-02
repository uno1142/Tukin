import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { TrainingLog } from '../features/gymSlice';

const TrainingHistoryScreen = () => {
  const trainingLog = useSelector<RootState, TrainingLog[]>((state) => state.gym.trainingLog);

  return (
    <View>
      {trainingLog.map((log, index) => (
        <View key={index}>
          <Text>{new Date(log.startTime).toLocaleDateString()}</Text>
          <Text>{log.parts.join(', ')}</Text>
        </View>
      ))}
    </View>
  );
};

export default TrainingHistoryScreen;
