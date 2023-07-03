// HomeScreen.tsx
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Alert,
  Button,
} from 'react-native';
import { RootState, AppDispatch } from '../store/store';
import { toggleTraining } from '../features/gymSlice';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../navigation/types';
import { PARTS, trainingTips } from '../constants/constants';
import { PartButton } from '../components/PartButton';

const HomeScreen: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const isTraining = useSelector<RootState, boolean>((state) => state.gym.isTraining);
  const scaleValue = useRef(new Animated.Value(0)).current;
  const hasSelectedParts = useSelector<RootState, boolean>(
    (state) => state.gym.selectedParts.length > 0,
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Calendar" onPress={() => navigation.navigate('Calendar')} />
      ),
    });
  }, [navigation]);

  const randomTip = trainingTips[Math.floor(Math.random() * trainingTips.length)];

  const handleTraining = useCallback(() => {
    dispatch(toggleTraining());

    // トレーニング終了時にダイアログを表示
    if (isTraining) {
      Alert.alert('お疲れさまでした！', `\n${randomTip}`, [{ text: 'OK', onPress: () => {} }]);
    }
  }, [dispatch, isTraining, randomTip]);

  const startAnimation = useCallback(() => {
    Animated.loop(
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // トレーニング中の文字のアニメーション
  useEffect(() => {
    if (isTraining) {
      startAnimation();
    } else {
      scaleValue.setValue(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTraining, startAnimation]);

  // 表示時刻の更新処理
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // scaleValueの値に応じてスケールを変える
  const scale = scaleValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.5, 1],
  });

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours} : ${minutes}: ${seconds}`;
  };

  const viewTrainingHistory = () => {
    navigation.navigate('TrainingHistory');
  };

  const viewAddTrainingLogScreen = () => {
    navigation.navigate('AddTrainingLog');
  };

  const clearLog = () => {
    Alert.alert('履歴をクリアします');
    dispatch(clearLog);
  };
  return (
    <View style={styles.container}>
      {isTraining && (
        <Animated.Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            transform: [{ scale: scale }],
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
            paddingBottom: 50,
            color: 'green',
          }}
        >
          トレーニング中
        </Animated.Text>
      )}
      <Text style={styles.time}>{formatTime(currentTime)}</Text>
      <View style={styles.partContainer}>
        {PARTS.map((part, i) => (
          <PartButton key={i} part={part} />
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
      <TouchableOpacity
        onPress={viewAddTrainingLogScreen}
        style={styles.backFromGymButton}
        disabled={isTraining}
      >
        <Text style={styles.notAvairableText}>手動で履歴を追加</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={clearLog} style={styles.clearButton} disabled={isTraining}>
        <Text style={styles.danger}>履歴をクリア</Text>
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
  avairableText: {
    color: 'white',
  },
  notAvairableText: {},
  clearButton: { marginTop: 16, alignItems: 'flex-end' },
  danger: { color: 'red' },
});
