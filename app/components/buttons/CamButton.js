import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function CamButton({ action, index }) {
  return (
    <React.Fragment>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => action(index)}
      >
        <Text
          style={styles.text}>
          CAM { index + 1 } 
        </Text>
      </TouchableOpacity>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#66ff66',
    height: 50,
    width: 70,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#e6e6e6',
    borderWidth: 1,
    zIndex: 2,
  },
  text: {
    color: 'white',
    fontWeight: '900',
    textShadowColor: 'rgba(0, 0, 0, 0.60)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    zIndex:3,
  }
})
