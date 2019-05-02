/* eslint-disable import/prefer-default-export */
import { StyleSheet } from 'react-native';

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
  buttonLeft: {
    position: 'absolute',
    top:16,
    left:15,    
  },
  buttonRight: {
    position: 'absolute',
    top:20,
    right:15,    
  },
})
