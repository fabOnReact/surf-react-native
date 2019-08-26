import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  }, 
  wrapperLeft: {
    left: 20,
  },
  wrapperCenter: {
    width: '50%',
    left: "50%",
    transform: [{ translateX: -50 }],
  },
  video: {
    flex: 2,
    borderRadius: 9,
    width: null,
    overflow: 'hidden',
  }
})
