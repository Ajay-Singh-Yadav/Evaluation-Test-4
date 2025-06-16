import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import AuthGate from './src/services/AuthGate';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AuthGate />
    </NavigationContainer>
  );
};

export default App;

//  <Stack.Navigator>

//       <Stack.Screen name="Login" component={LogInScreen} />
//       <Stack.Screen name="SignUp" component={SignUpScreen} />

//       <Stack.Screen name="MainTab" component={MainTabs} />
//     </Stack.Navigator>
