import React, { Component, useState } from 'react'
import { StyleSheet, Platform, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';

export function RecordingButton({ recording, highlight }){
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

export function UploadButton({ upload }){
  return (
    <Icon
      containerStyle={[buttons.containerRight, {borderRadius: 10}]}
      name='ios-checkmark'
      type='ionicon'
      size={40}
      color='black'
      reverseColor='white'
      reverse
      raised
      underlayColor='transparent'
      disabledStyle={{backgroundColor: "transparent"}}
      onPress={upload}
    />
  )
}

export function ProfileButton({ navigation }){
  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate("Profile") }
      style={buttons.containerRight}>
      <Image 
        style={buttons.buttonRight} 
        source={require('../images/profile-user.png')}
      />
    </TouchableOpacity>
  )
}

export function MapButton({ navigation }) {
  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate("Map", { lat: latitude, lon: longitude }) }
      style={buttons.containerLeft}>
      <Image 
        style={buttons.buttonLeft} 
        source={require('../images/location.png')}
      />
    </TouchableOpacity>
  )
}

export function CameraButton({ navigation }) {
  return (
    <Icon
      containerStyle={buttons.buttonReverseAbsolute}
      name='camera-retro'
      type='font-awesome'
      size={40}
      color='white'
      iconColor='black'
      reverseColor='black'
      reverse
      raised
      onPress={() => navigation.navigate("Camera") }
    />
  )
}

const buttons = StyleSheet.create({
  buttonReverseAbsolute: {
    position: 'absolute',
    bottom:10,
    right:"50%",    
    transform: [{translateX: 50}],
    shadowColor: 'rgba(0,0,0, .4)', 
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 3,
  },
  buttonAbsolute: {
    position: 'absolute',
    bottom:10,
    right:"50%",    
    transform: [{translateX: 36}]
  },
  containerLeft: {
    position: 'absolute',
    bottom:20,
    left:15,    
  },
  buttonLeft: {
    height: 60,
    width: 60,
  },
  containerRight: {
    position: 'absolute',
    bottom: 21,
    right:15,    
  },
  buttonRight: {
    height: 60,
    width: 60
  },
})
