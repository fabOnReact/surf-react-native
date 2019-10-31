import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function RoundDisplayButton({ action }){
  return (
    <Icon 
      name='md-arrow-round-forward'
      size={50} 
      color="white" 
      onPress={action}
      style={styles.icon}
    />
  )
}


const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 450,
    right: 20,
    height: 200,
    zIndex:4,
    textShadowColor: 'grey',
    shadowOpacity: 2,
    textShadowRadius: 10,
    textShadowOffset:{width: 5,height: 2},
  },
})
