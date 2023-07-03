import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deselectPart, selectPart } from '../features/gymSlice';
import { AppDispatch, RootState } from '../store/store';

export const PartButton: React.FC<{ part: string }> = ({ part }) => {
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
    // eslint-disable-next-line react/react-in-jsx-scope
    <TouchableOpacity
      onPress={handlePress}
      style={isSelected ? styles.selectedPartButton : styles.partButton}
      disabled={isTraining}
    >
      {/* eslint-disable-next-line react/react-in-jsx-scope*/}
      <Text style={isSelected ? styles.avairableText : styles.notAvairableText}>{part}</Text>
    </TouchableOpacity>
  );
};

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
