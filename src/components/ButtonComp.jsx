import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

const ButtonComp = ({title, onPress, icon, backgroundColor = 'black'}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.ButtonContainer, {backgroundColor}]}>
        <Text style={styles.ButtonText}>{title}</Text>
        <Entypo name={icon} size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default ButtonComp;

const styles = StyleSheet.create({
  container: {},
  ButtonContainer: {
    flexDirection: 'row',
    backgroundColor: 'black',
    width: 250,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonText: {
    fontFamily: 'TenorSans-Regular',
    color: 'white',
    fontSize: 25,
    marginRight: 10,
  },
});
