import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LogInScreen from '../screens/LogInSignup/LogInScreen';
import SignUpScreen from '../screens/LogInSignup/SignUpScreen';

import {ActivityIndicator, View} from 'react-native';
import MainTabs from '../navigation/MainTabs';

const Stack = createNativeStackNavigator();

const AuthGate = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(currentUser => {
      setUser(currentUser);
      if (initializing) setInitializing(false);
    });

    return subscriber;
  }, []);

  if (initializing) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {user ? (
        <Stack.Screen name="MainTab" component={MainTabs} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LogInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthGate;
