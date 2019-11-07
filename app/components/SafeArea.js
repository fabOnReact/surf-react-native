import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Platform, StatusBar } from 'react-native'
import { Header, SafeAreaView } from 'react-navigation';

export default class SafeArea extends Component {
  render() {
    const { style } = this.props
    return (
      <View
        style={[
          styles.safe_area,
          style
        ]}>
        { this.props.children }
      </View>
    )
  }
}

const is_ios = Platform.OS === 'ios'
let deviceH = Dimensions.get('screen').height;
let windowH = Dimensions.get('window').height;
let bottomNavBarH = deviceH - windowH;

const styles = StyleSheet.create({
  safe_area: {
    zIndex: 0,
    position: 'absolute',
    bottom: is_ios ? 7 : bottomNavBarH,
    left: 0,
    right: 0,
  },
})
