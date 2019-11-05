import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default function MapButton({ action }){
  return (
    <TouchableOpacity
      onPress={action}
      style={styles.container}
    >
      <Icon name="md-globe" 
        size={60} 
        color="white"
        style={styles.icon}/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom:20,
    left:15,    
  },
  icon: {
    shadowColor: 'black', 
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    textShadowOffset: { height: 1, width: 1},
    textShadowRadius: 1,
    elevation: 1,
    marginTop: -5,
  },
})
