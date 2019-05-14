/* eslint-disable import/prefer-default-export */
import { StyleSheet, Platform } from 'react-native';

export const buttons = StyleSheet.create({
  buttonReverseAbsolute: {
    position: 'absolute',
    bottom:10,
    right:"50%",    
    transform: [{translateX: 50}]
  },
  buttonAbsolute: {
    position: 'absolute',
    bottom:10,
    right:"50%",    
    transform: [{translateX: 36}]
  },
  containerLeft: {
    position: 'absolute',
    bottom:20,
    left:15,    
  },
  buttonLeft: {
    height: 30,
    width: 30
  },
  containerRight: {
    position: 'absolute',
    bottom: 21,
    right:15,    
  },
  buttonRight: {
    height: 30,
    width: 30
  },
})
