/* eslint-disable import/prefer-default-export */
import { StyleSheet, Platform } from 'react-native';

export const buttons = StyleSheet.create({
  buttonReverseAbsolute: {
    position: 'absolute',
    bottom:10,
    right:"50%",    
    transform: [{translateX: 50}],
    shadowColor: 'rgba(0,0,0, .4)', 
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 3,
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
    height: 60,
    width: 60,
  },
  containerRight: {
    position: 'absolute',
    bottom: 21,
    right:15,    
  },
  buttonRight: {
    height: 60,
    width: 60
  },
})
