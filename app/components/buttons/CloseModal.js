import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function DisplayButton({ action, styles }){
  return (
      <Icon 
        name='md-close'
        size={55} 
        color="black" 
        onPress={action}
        style={styles}
    />
  )
}
