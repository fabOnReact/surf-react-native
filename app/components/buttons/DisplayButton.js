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

const styles = StyleSheet.create({
  containerRight: {
    position: "absolute",
    bottom: 120,
    right: 5,
    height: 50,
    width: 100,
    backgroundColor: 'white',
    borderRadius: 15,
    zIndex: 1,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
})
