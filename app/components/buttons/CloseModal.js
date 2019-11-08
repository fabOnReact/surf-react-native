import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function CloseModal({ action, styles }){
  return (
      <Icon 
        name='md-close'
        size={50} 
        color="black" 
        onPress={action}
        style={[styles.container, styles.icon, styles]}
    />
  )
}

const styles = StyleSheet.create({
  icon: {
    shadowColor: 'black', 
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    textShadowOffset: { height: 2, width: 2},
    textShadowRadius: 1,
    elevation: 1,
  },
})
