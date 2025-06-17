import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';

const ProfileScreen = () => {
  const route = useRoute();
  const [user, setUser] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const currentUser = auth().currentUser;
    setUser(currentUser);
  }, []);

  useEffect(() => {
    if (route.params?.capturedImage) {
      setCapturedImage(route.params.capturedImage);
      navigation.setParams({capturedImage: null}); // clear after first use
    }
  }, [route.params?.capturedImage]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <View style={styles.profileImageContainer}>
        <Image
          source={
            capturedImage
              ? {uri: capturedImage}
              : user?.photoURL
              ? {uri: user.photoURL}
              : require('../assets/images/man.png')
          }
          style={styles.profileImage}
        />

        <TouchableOpacity
          style={styles.editIcon}
          onPress={() => navigation.navigate('Camera')}>
          <Icon name="camera" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <InfoItem label="Full Name" value={user?.displayName || 'Ajay Yadav'} />
        <InfoItem label="Email" value={user?.email || 'example@gmail.com'} />
        <InfoItem label="Phone" value="+91 9876543210" />
        <InfoItem label="Password" value="••••••••••" isSecure />
      </View>

      <TouchableOpacity
        style={styles.editProfileBtn}
        onPress={() => Alert.alert('Edit Profile')}>
        <Text style={styles.editProfileText}>Edit Profile</Text>
        <Icon name="pencil" size={18} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const InfoItem = ({label, value, isSecure = false}) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}</Text>
    <View style={styles.infoValueRow}>
      <Text style={styles.infoValue}>{isSecure ? '••••••••••' : value}</Text>
      <Icon name="chevron-forward-outline" size={20} color="#ccc" />
    </View>
  </View>
);

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#F5F6FA',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#ccc',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: -5,
    backgroundColor: '#333',
    borderRadius: 20,
    padding: 5,
  },
  infoContainer: {
    width: '90%',
    marginTop: 40,
  },
  infoItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingBottom: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  infoValueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 30,
  },
  editProfileText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
});
