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
  buttonLeft: {
    position: 'absolute',
    top:Platform.OS === 'ios' ? 76 : 20,
    left:15,    
  },
  buttonRight: {
    position: 'absolute',
    top:Platform.OS === 'ios' ? 76 : 20,
    right:15,    
  },
})
