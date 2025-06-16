import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CameraScreen from '../screens/CameraScreen';
import MainTabs from './MainTabs';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
