import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  increment,
  decrement,
  incrementByAmount,
  reset,
} from '../redux/slices/counterSlice';

const HomeScreen = () => {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      Alert.alert('Logout Error', error.message);
    }
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}>
      <FontAwesome name="search" size={30} color="black" />
      <Text style={styles.text}>HomeScreen</Text>

      <Text style={styles.emailText}>Logged in as: {userEmail}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.counter}>Count: {count}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
      <Button title="Add 5" onPress={() => dispatch(incrementByAmount(5))} />
      <Button title="Reset" onPress={() => dispatch(reset())} />
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'TenorSans-Regular',
    fontSize: 30,
    color: '#fff',
    marginBottom: 20,
  },
  emailText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'TenorSans-Regular',
  },
  counter: {
    fontSize: 30,
    marginBottom: 20,
  },
});
