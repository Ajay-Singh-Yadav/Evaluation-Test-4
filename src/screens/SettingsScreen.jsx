import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const SettingItem = ({icon, label, onPress}) => (
  <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    <Icon name={icon} size={24} color="#333" style={styles.icon} />
    <Text style={styles.label}>{label}</Text>
    <Icon name="chevron-forward" size={22} color="#999" />
  </TouchableOpacity>
);

const SettingsScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.replace('Login'); // or navigate to Auth Stack
    } catch (error) {
      Alert.alert('Logout Error', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <SettingItem
        icon="color-palette-outline"
        label="Theme"
        onPress={() => Alert.alert('Change Theme')}
      />
      <SettingItem
        icon="person-outline"
        label="Account"
        onPress={() => Alert.alert('Account Settings')}
      />
      <SettingItem
        icon="notifications-outline"
        label="Notifications"
        onPress={() => Alert.alert('Notification Settings')}
      />
      <SettingItem
        icon="help-circle-outline"
        label="Help & Support"
        onPress={() => Alert.alert('Help')}
      />
      <SettingItem
        icon="log-out-outline"
        label="Logout"
        onPress={handleLogout}
      />
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F8FA',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#222',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  icon: {
    marginRight: 15,
    width: 30,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});
