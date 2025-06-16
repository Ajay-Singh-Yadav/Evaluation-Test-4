import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';

export const login = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    Alert.alert('Registration Error', error.message);
  }
};

export const SignUp = async (email, password) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    Alert.alert('Registration Error', error.message);
  }
};
