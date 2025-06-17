import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppStack from '../navigation/AppStack';
import AuthStack from '../navigation/AuthStack';
import WelcomeScreen from '../screens/WelcomeScreen';

const AuthGate = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const checkWelcome = async () => {
      setShowWelcome(true);
      setTimeout(() => {
        setShowWelcome(false);
      }, 3000);
    };
    checkWelcome();
  }, []);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setUser(user);
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (showWelcome) return <WelcomeScreen />;
  if (initializing) return <ActivityIndicator size="large" color="tomato" />;
  return user ? <AppStack /> : <AuthStack />;
};

export default AuthGate;
