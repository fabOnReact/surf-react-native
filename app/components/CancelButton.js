import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CancelButton({ deleteVideo }){
  return (
    <TouchableOpacity
      text="Submit"
      style={styles.containerRight}
      onPress={deleteVideo} >
      <Text>Cancel</Text>
      <Icon name="ios-close" 
        size={50} 
        color="black" />
    </TouchableOpacity>
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
