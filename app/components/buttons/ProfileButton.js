import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default function ProfileButton({ action }){
  return (
    <TouchableOpacity
      onPress={action}
      style={styles.container}
      testID={"profileButton"}
    >
      <Icon name="md-person" 
        size={60} 
        color="white"
        style={styles.icon}/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 21,
    right:15,    
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
