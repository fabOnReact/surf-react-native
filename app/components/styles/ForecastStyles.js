import { Dimensions, StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    width: "100%",
    alignItems: 'center',
    bottom: 5,
  },
  flexbox: {
    flex:1, 
    flexDirection: 'column', 
    position: 'absolute', 
    top:0, 
    height: Dimensions.get("window").height, 
    width: Dimensions.get("window").width, 
    justifyContent: "flex-end", 
    alignItems: 'center',
  },
  overlayText: {
    fontSize: 30,
  },
  shadowHeader: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'justify',
    textShadowColor: 'rgb(0, 0, 0)',
    textShadowOffset: {width: -2, height: 2},
    textShadowRadius: 1,
    marginBottom: 5,
  }, 
  container: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginBottom: 20,
  },
  header: {
    marginLeft: 7,
    marginRight: 7,
  },
  icon : { 
    tintColor: 'white', 
    height: 30, 
    width: 30, 
  }
})
