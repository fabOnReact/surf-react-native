import React, { Component } from 'react'
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

export default function RecordingButton({ recording, highlight }){
  return (
    <Icon
      containerStyle={[buttons.buttonAbsolute, {borderRadius: 10}]}
      name='ios-radio-button-on'
      type='ionicon'
      size={80}
      color={ highlight ? 'red' : '#ffffff' }
      underlayColor='transparent'
      disabledStyle={{backgroundColor: "transparent"}}
      onPress={recording}
    />
  )
}

const buttons = StyleSheet.create({
  buttonAbsolute: {
    position: 'absolute',
    bottom:10,
    right:"50%",    
    transform: [{translateX: 36}]
  },
})
