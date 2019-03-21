/* eslint-disable import/prefer-default-export */
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    fontSize: 20
  },
  cardContainer: {
    marginTop: 10,
    marginRight: 6,
    marginLeft: 6,
  },  
  button: {
    width: 220,
    height: 50,
  },
  buttonAbsolute: {
    position: 'absolute',
    bottom:0,
    right:1,    
  },
  textInput: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  },
  errorText: {
    fontSize: 18,
    color: 'white',
  },
  errorContainer: {
    borderColor: 'black',
    borderWidth: 2,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 50,
    paddingLeft: 50,
    backgroundColor: 'red',
  }
});
