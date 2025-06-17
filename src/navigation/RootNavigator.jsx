// src/navigation/RootNavigator.js
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkStorage = async () => {
      const hasSeenWelcome = await AsyncStorage.getItem('hasSeenWelcome');
      const userToken = await AsyncStorage.getItem('userToken');

      if (!hasSeenWelcome) {
        setShowWelcome(true);
      } else {
        setShowWelcome(false);
      }

      setIsLoggedIn(!!userToken);
    };

    checkStorage();
  }, []);

  const onFinishWelcome = async () => {
    await AsyncStorage.setItem('hasSeenWelcome', 'true');
    setShowWelcome(false);
  };

  if (showWelcome) {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome">
          {props => <WelcomeScreen {...props} onFinish={onFinishWelcome} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <Stack.Screen name="AppStack" component={AppStack} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
