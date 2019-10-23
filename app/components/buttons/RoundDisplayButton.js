import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function RoundDisplayButton({ action }){
  return (
    <TouchableOpacity
      style={styles.container}>
      <Icon 
        name='md-arrow-round-forward'
        size={30} 
        color="white" 
        onPress={action}
        style={styles.icon}>
        <Text
          style={styles.text}>
          Display Map
        </Text>
      </Icon>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  icon: {
    zIndex:4,
    textShadowColor: 'grey',
    shadowOpacity: 2,
    textShadowRadius: 10,
    textShadowOffset:{width: 5,height: 2}
  },
  container: {
    position: 'absolute',
    top: 420,
    right:20,
    height: 100,
    width: 300,
    backgroundColor: 'black',
    borderRadius: 15,
    zIndex: 1,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  text: {
    fontSize: 20,
  }
})
