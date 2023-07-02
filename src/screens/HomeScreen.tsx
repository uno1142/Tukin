// HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { RootState, AppDispatch } from '../store/store';
import { selectPart, deselectPart, toggleTraining } from '../features/gymSlice';

const PARTS = ['脚', '胸', '背中', '肩', '腕', '腹筋'];

const PartButton: React.FC<{ part: string }> = ({ part }) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedParts = useSelector<RootState, string[]>((state) => state.gym.selectedParts);
  const isTraining = useSelector<RootState, boolean>((state) => state.gym.isTraining);
  const isSelected = selectedParts.includes(part);

  const handlePress = () => {
    if (isSelected) {
      dispatch(deselectPart(part));
    } else {
      dispatch(selectPart(part));
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={isSelected ? styles.selectedPartButton : styles.partButton}
      disabled={isTraining}
    >
      <Text style={isSelected ? styles.avairableText : styles.notAvairableText}>{part}</Text>
    </TouchableOpacity>
  );
};

const HomeScreen: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const dispatch = useDispatch<AppDispatch>();
  const isTraining = useSelector<RootState, boolean>((state) => state.gym.isTraining);
  const hasSelectedParts = useSelector<RootState, boolean>(
    (state) => state.gym.selectedParts.length > 0,
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // 1000ミリ秒ごとに更新する

    // useEffectのクリーンアップ関数でタイマーをクリアする
    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours} : ${minutes}: ${seconds}`;
  };

  const handleTraining = () => {
    dispatch(toggleTraining());
  };

  const viewTrainingHistory = () => {
    // TODO: トレーニング履歴画面への遷移を実装
  };

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formatTime(currentTime)}</Text>
      <View style={styles.partContainer}>
        {PARTS.map((part) => (
          <PartButton key={part} part={part} />
        ))}
      </View>
      <TouchableOpacity
        onPress={handleTraining}
        style={!hasSelectedParts ? styles.backFromGymButton : styles.goToGymButton}
        disabled={!hasSelectedParts}
      >
        <Text style={!hasSelectedParts ? styles.notAvairableText : styles.avairableText}>
          {isTraining ? '退筋' : '出筋'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={viewTrainingHistory}
        style={styles.backFromGymButton}
        disabled={isTraining}
      >
        <Text style={styles.notAvairableText}>トレーニング履歴を確認</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  time: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  partContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  goToGymButton: {
    marginTop: 16,
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
  },
  backFromGymButton: {
    marginTop: 16,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  partButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  selectedPartButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
  },
  avairableText: {
    color: 'white',
  },
  notAvairableText: {},
});
