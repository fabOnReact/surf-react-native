import { Dimensions, StyleSheet, Platform } from 'react-native';

export const header = StyleSheet.create({
  text: {
    width: "100%",
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    textShadowColor: 'rgb(0, 0, 0)',
    textShadowOffset: {width: -2, height: 2},
    textShadowRadius: 1,
    textAlign: 'center',
    marginBottom: 5,
  }, 
  shadowHeader: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textShadowColor: 'rgb(0, 0, 0)',
    textShadowOffset: {width: -2, height: 2},
    textShadowRadius: 1,
    marginBottom: 5,
  }, 
})
