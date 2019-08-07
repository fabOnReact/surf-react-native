import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  arrow: {
    position: "absolute", 
    top: 0, 
    left: 0,
    width: 200, 
    height: 200,
    marginTop: 100,
    marginBottom: 100,
    marginLeft: 100,
    marginRight: 100,
  },
  container: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  icon : { height: 30, width: 30 }
})
