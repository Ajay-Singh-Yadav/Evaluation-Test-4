import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Button,
  PermissionsAndroid,
  Platform,
  Linking,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const CameraScreen = () => {
  const navigation = useNavigation();
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraType, setCameraType] = useState('back');
  const [capturedImage, setCapturedImage] = useState(null);

  const device = useCameraDevice(cameraType);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermission();

      if (cameraPermission === 'denied') {
        Alert.alert(
          'Camera Permission Required',
          'Please enable camera access from settings.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: () => Linking.openSettings()},
          ],
        );
        return;
      }

      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn('Storage permission denied');
        }
      }

      setHasPermission(true);
      setCameraActive(true);
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePhoto();
        navigation.navigate('MainTabs', {
          screen: 'Profile',
          params: {capturedImage: 'file://' + photo.path},
        });
      } catch (error) {
        console.error('Capture failed:', error);
      }
    }
  };

  const flipCamera = () => {
    setCameraType(prev => (prev === 'back' ? 'front' : 'back'));
  };

  if (!hasPermission) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>Loading camera device...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={cameraActive}
        photo={true}
      />

      {capturedImage && (
        <View style={styles.previewContainer}>
          <Image
            source={{uri: 'file://' + capturedImage}}
            style={styles.preview}
          />
        </View>
      )}

      <TouchableOpacity style={styles.flipButton} onPress={flipCamera}>
        <Ionicons name="camera-reverse-outline" size={32} color="#fff" />
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <Button title="Take Photo" onPress={takePhoto} />
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centered: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  flipButton: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 12,
    borderRadius: 50,
  },
  previewContainer: {
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  preview: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});
