import React, {useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LottieView from 'lottie-react-native';

const WelcomeScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/images/welcome.png')}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.overlay} />

      <View style={styles.content}>
        <Text style={styles.title}>Evaluation Test 4</Text>
        <Text style={styles.subtitle}>
          Push your limits, track your growth.
        </Text>

        <LottieView
          source={require('../assets/animation/Loader.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#f0f0f0',
    textAlign: 'center',
    marginBottom: 30,
  },
  lottie: {
    width: width * 0.7,
    height: height * 0.3,
    marginTop: 50,
    color: 'white',
  },
});
