import React, { Component } from 'react'
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

export default function CameraButton({ action }) {
  return (
    <Icon
      containerStyle={buttons.buttonReverseAbsolute}
      name='camera-retro'
      type='font-awesome'
      size={40}
      color='black'
      iconColor='black'
      raised
      onPress={action}
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
