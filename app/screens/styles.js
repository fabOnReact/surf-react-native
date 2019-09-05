/* eslint-disable import/prefer-default-export */
import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: Dimensions.get("window").height, 
    width: '100%',
  },
  button: {
    width: 220,
    height: 50,
  },
});
