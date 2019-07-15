import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlayText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  }, 
  wrapper: {
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: 150,
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
  },
  wrapperLeft: {
    left: 20,
  },
  wrapperCenter: {
    width: '50%',
    left: "50%",
    transform: [{ translateX: -50 }],
  }
})
