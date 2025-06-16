import {StyleSheet, Text, View} from 'react-native';
import React, {use, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, Ajay!</Text>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 24, fontWeight: 'bold'},
});
