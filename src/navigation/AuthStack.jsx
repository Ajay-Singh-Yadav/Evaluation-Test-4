import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogInScreen from '../screens/LogInSignup/LogInScreen';
import SignUpScreen from '../screens/LogInSignup/SignUpScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LogInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
