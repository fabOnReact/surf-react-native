import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function MapButton({ navigation, locations, latitude, longitude }) {
  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate("Map", { 
        lat: latitude, 
        lon: longitude, 
        locations: locations 
      }) }
      style={buttons.containerLeft}>
      <Image 
        style={buttons.buttonLeft} 
        source={require('../../images/location.png')}
      />
    </TouchableOpacity>
  )
}

const buttons = StyleSheet.create({
  containerLeft: {
    position: 'absolute',
    bottom:20,
    left:15,    
  },
  buttonLeft: {
    height: 60,
    width: 60,
  },
})
