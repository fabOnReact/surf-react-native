import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function UploadButton({ upload }){
  return (
    <TouchableOpacity
      text="Submit"
      style={styles.containerLeft}
      onPress={upload}>
      <Icon name="ios-checkmark" 
        size={50} 
        color="black" />
      <Text>Upload</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  containerLeft: {
    position: "absolute",
    bottom: 120,
    left: 5,
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
