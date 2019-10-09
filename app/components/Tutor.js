import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { useDimensions } from 'react-native-hooks'

export default function Tutor({hide}) {
  const { height } = useDimensions().window
  return (
    <View style={[styles.container, { height: height }]}>
      <Text style={styles.text}>Please take a short video of the surf set.</Text>
      <Text style={styles.text}>The video should be 3-5 minutes long and showcase the best waves right now.</Text>
      <Text style={styles.text}>You need to be at the beach.</Text>
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
