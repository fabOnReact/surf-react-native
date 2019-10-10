import React, { Component, useState } from 'react'
import { Icon } from 'react-native-elements';
import { buttons } from '../components/styles/ButtonStyles';

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
