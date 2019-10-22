import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { useDimensions } from 'react-native-hooks'

export default function Tutor({hide}) {
  const { height } = useDimensions().window
  return (
    <View style={[styles.container, { height: height }]}>
      <Text style={styles.text}>Record other surfers with your phone for 1-3 minutes.</Text>
      <Text style={styles.text}>Use the zoom on your phone to better display the surfing condition and the type of wave.</Text>
      <Text style={styles.text}>It will help us improve our surfing and better forecast the wave conditions.</Text>
      <TouchableOpacity
        style={styles.button}
        color="white"
        onPress={() => hide()}>
        <Text style={styles.buttonText}>OK</Text>
      </TouchableOpacity>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#00b300',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 15,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: 'center',
  },
  button: {
    height: "10%",
    flex: 2,
    maxHeight: 70,
    maxWidth: 200,
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    padding: 20,
    borderRadius: 50,
    backgroundColor: 'white', 
    borderColor: "#ffff99",
    borderWidth: 3,
    shadowColor: 'rgba(0,0,0, .4)', 
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 3,
  },
  buttonText: {
    fontSize: 25,
  },
});
