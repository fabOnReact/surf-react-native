import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  }, 
  overlayText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textShadowColor: 'rgb(0, 0, 0)',
    textShadowOffset: {width: -2, height: 2},
    textShadowRadius: 1    
  }, 
  wrapper: {
    position: 'absolute',
    width: "100%",
    alignItems: 'center',
    bottom: 5,
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
