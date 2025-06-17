import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import AuthGate from './src/services/AuthGate';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {LogBox} from 'react-native';
import WelcomeScreen from './src/screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  LogBox.ignoreLogs([
    'This method is deprecated (as well as all React Native Firebase namespaced API)',
  ]);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthGate />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
