import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import TrainingHistoryScreen from '../screens/TrainingHistoryScreen';
import CalendarScreen from '../screens/CalendarScreen';
import AddTrainingLogScreen from '../screens/AddLogScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="通筋くん" component={HomeScreen} />
        <Stack.Screen name="TrainingHistory" component={TrainingHistoryScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="AddTrainingLog" component={AddTrainingLogScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
