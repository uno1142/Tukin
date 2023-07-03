import React, { useState } from 'react';
import {
  Button,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { addTrainingLog } from '../features/gymSlice';
import { PARTS } from '../constants/constants';
import { PartButton } from '../components/PartButton';
import { RootState } from '../store/store';

const AddTrainingLogScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [totalTime, setTotalTime] = useState<string>('');
  const selectedParts = useSelector<RootState, string[]>((state) => state.gym.selectedParts);

  const dispatch = useDispatch();

  const handleDateChange = (event: Event, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  const handleSubmit = () => {
    const newLog = {
      startTime: selectedDate.toISOString(),
      endTime: '',
      totalTime,
      parts: selectedParts,
    };

    console.log(newLog);

    if (newLog.parts.length < 1 || newLog.totalTime === '') {
      Alert.alert('値を入力してください');
      return;
    }

    dispatch(addTrainingLog(newLog));
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateTimeButton}>
        <Text style={styles.dateText}>{selectedDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode={'date'}
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.alignCenter}>部位</Text>
      <View style={styles.partContainer}>
        {PARTS.map((part, i) => (
          <PartButton key={i} part={part} />
        ))}
      </View>

      <Text style={styles.alignCenter}>トレーニング時間（分）:</Text>
      <TextInput
        onChangeText={setTotalTime}
        value={totalTime}
        keyboardType="numeric"
        style={{ backgroundColor: '#DDDDDD' }}
      />

      <Button title="Log Training" onPress={handleSubmit} />
    </View>
  );
};

export default AddTrainingLogScreen;

const styles = StyleSheet.create({
  partContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 16,
  },
  dateTimeButton: { height: 50, alignItems: 'center' },
  dateText: {
    fontSize: 30,
  },
  alignCenter: {
    alignSelf: 'center',
  },
});
