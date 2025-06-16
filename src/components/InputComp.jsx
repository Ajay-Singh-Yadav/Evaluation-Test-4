import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';

import Entypo from 'react-native-vector-icons/Entypo';

const InputComp = ({
  icon,
  placeholder,
  value,
  onChangeText,
  onBlur,
  secureTextEntry = false,
  keyboardType = 'default',
  onEyePress,
  showPassword,
}) => {
  const isPasswordField = icon === 'lock';

  return (
    <View style={[styles.inputTextWrapper, {}]}>
      <View style={styles.inputTextContainer}>
        <Entypo name={icon} size={30} color="#C8C8C8" />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#C8C8C8"
          style={styles.inputText}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />

        {isPasswordField && (
          <TouchableOpacity onPress={onEyePress}>
            <Entypo
              name={showPassword ? 'eye' : 'eye-with-line'}
              size={22}
              color="#C8C8C8"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputComp;

const styles = StyleSheet.create({
  inputTextWrapper: {
    height: 70,
    width: 430,
  },
  inputTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  icon: {
    marginRight: 10,
  },
  inputText: {
    flex: 1,
    height: 64,
    fontSize: 18,
    color: '#000',
    marginLeft: 10,
  },
});
