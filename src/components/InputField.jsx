import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const InputField = ({
  iconName,
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  isPassword = false,
  showPassword = false,
  toggleShowPassword = () => {},
  keyboardType = 'default',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Entypo name={iconName} size={24} color="#C8C8C8" />
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor="#C8C8C8"
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType}
        />
        {isPassword && (
          <TouchableOpacity onPress={toggleShowPassword}>
            <Entypo
              name={showPassword ? 'eye' : 'eye-with-line'}
              size={20}
              color="#C8C8C8"
              style={{marginLeft: 10}}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    height: 90,
    marginBottom: 30,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 330,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 10,
    marginTop: 4,
  },
});
