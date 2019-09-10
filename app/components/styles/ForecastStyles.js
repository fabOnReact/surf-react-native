import { Dimensions, StyleSheet, Platform } from 'react-native';

const height = Dimensions.get("window").height
const width = Dimensions.get("window").width
export const styles = StyleSheet.create({
  flexbox: {
    display: 'flex',
    flex: 1,
    height: height,
    width: width,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  overlayText: {
    fontSize: 30,
  },
  shadowHeader: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textShadowColor: 'rgb(0, 0, 0)',
    textShadowOffset: {width: -2, height: 2},
    textShadowRadius: 1,
    marginBottom: 5,
  }, 
  header: {
    marginLeft: 30,
    marginRight: 30,
  },
  icon : { 
    position: "absolute",
    top: "86%",
    height: 30, 
    width: 30, 
  }
})
