import React, { Component } from 'react'
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

export default function RecordingButton({ recording, highlight }){
  return (
    <Icon
      containerStyle={[buttons.buttonAbsolute]}
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
    zIndex: 10,
    shadowColor: 'rgba(0,0,0, .4)', 
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 3,
    marginBottom: 20,
  },
})
