import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { TrainingLog } from '../features/gymSlice';

const TrainingHistoryScreen: React.FC = () => {
  const trainingLog = useSelector<RootState, TrainingLog[]>((state) =>
    [...state.gym.trainingLog].sort(
      (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
    ),
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {trainingLog.map((log, index) => (
        <View key={index} style={styles.logItem}>
          <Text style={styles.logText}>{new Date(log.startTime).toLocaleDateString()}</Text>
          <Text style={styles.logText}>{log.parts.join(', ')}</Text>
          <Text style={styles.logText}>{'トレーニング時間合計　：　' + log.totalTime + '分'}</Text>
          {/*
          <Tweet
            tweetText={`退筋しました！トレーニング時間：${log.totalTime}分 #通筋くん`}
            buttonStyle={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
            textStyle={{ color: 'white', fontSize: 16 }}
            buttonTitle="Tweet"
          />
          */}
        </View>
      ))}
    </ScrollView>
  );
};

export default TrainingHistoryScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logItem: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  logText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
