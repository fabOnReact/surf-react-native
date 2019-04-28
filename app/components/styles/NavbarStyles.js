/* eslint-disable import/prefer-default-export */
import { StyleSheet } from 'react-native';

export const navstyles = StyleSheet.create({
  buttonAbsolute: {
    position: 'absolute',
    bottom:40,
    right:"50%",    
    transform: [{translateX: 30}]
  },
  buttonLeft: {
    position: 'absolute',
    bottom:35,
    left:20,    
  },
  textLeft: {
    position: 'absolute',
    bottom:20,
    left:25,
    color: 'white',
  },
  buttonRight: {
    position: 'absolute',
    bottom:35,
    right:20,    
  },
  textRight: {
    position: 'absolute',
    bottom:20,
    right:15,
    color: 'white',
  },
})
