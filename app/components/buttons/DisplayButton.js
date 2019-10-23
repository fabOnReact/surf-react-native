import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function DisplayButton({ action }){
  return (
      <Icon 
        name='md-arrow-round-forward'
        size={50} 
        color="white" 
        onPress={action}
    />
  )
}
