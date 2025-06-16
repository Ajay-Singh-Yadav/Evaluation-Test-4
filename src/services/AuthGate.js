import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

import {ActivityIndicator, View} from 'react-native';
import AuthStack from '../navigation/AuthStack';
import AppStack from '../navigation/AppStack';

const AuthGate = () => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(currentUser => {
      setUser(currentUser);
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (initializing) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return user ? <AppStack /> : <AuthStack />;
};

export default AuthGate;
