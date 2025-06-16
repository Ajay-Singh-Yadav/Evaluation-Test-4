import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import LogInScreen from './src/screens/LogInSignup/LogInScreen';
import SignUpScreen from './src/screens/LogInSignup/SignUpScreen';
import MainTabs from './src/navigation/MainTabs';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LogInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="MainTab" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
