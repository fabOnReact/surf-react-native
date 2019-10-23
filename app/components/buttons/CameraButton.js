import React, { Component } from 'react'
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

export default function CameraButton({ navigation }) {
  return (
    <Icon
      containerStyle={buttons.buttonReverseAbsolute}
      name='camera-retro'
      type='font-awesome'
      size={40}
      // color='white'
      color='black'
      iconColor='black'
      // reverseColor='black'
      // reverse
      raised
      onPress={() => navigation.navigate("Camera") }
    />
  )
}

const buttons = StyleSheet.create({
  buttonReverseAbsolute: {
    zIndex: 10,
    shadowColor: 'rgba(0,0,0, .4)', 
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 3,
    marginBottom: 20,
  },
})
