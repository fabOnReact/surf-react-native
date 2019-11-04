import React, { Component } from 'react'
import { Dimensions, Platform, StyleSheet, View } from 'react-native';

export default class Row extends Component {
  render() {
    const { options } = this.props
    return (
      <View
        style={[
          styles.flex_evenly,
          styles.absolute,
          options,
        ]}>
        { this.props.children }
      </View>
    )
  }
}

let deviceH = Dimensions.get('screen').height;
let windowH = Dimensions.get('window').height;
let bottomNavBarH = deviceH - windowH;
const cameraHeight = 120
const is_ios = Platform.OS === 'ios'
const styles = StyleSheet.create({
  flex_evenly: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    zIndex: 2,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: is_ios ? cameraHeight : bottomNavBarH + cameraHeight,
  },
  absolute : {
    position: 'absolute', 
    left: 0,
    right: 0,
  },
})
