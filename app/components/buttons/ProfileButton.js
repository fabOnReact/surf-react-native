import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function ProfileButton({ navigation }){
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

const buttons = StyleSheet.create({
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
