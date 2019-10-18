import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
// import { View } from 'react-native';
import Dimensions from 'Dimensions';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';

export default class ZoomView extends Component {
  onGesturePinch = ({ nativeEvent }) => {
    this.props.onPinchProgress(nativeEvent.scale)
  }

  onPinchHandlerStateChange = (event) => {
    const pinch_end = event.nativeEvent.state === State.END
    const pinch_begin = event.nativeEvent.oldState === State.BEGAN
    const pinch_active = event.nativeEvent.state === State.ACTIVE
    if (pinch_end) {
      this.props.onPinchEnd()
    }
    else if (pinch_begin && pinch_active) {
      this.props.onPinchStart()
    }
  }

  render() {
    const { style } = this.props
    return (
      <PinchGestureHandler
        onGestureEvent={this.onGesturePinch}
        onHandlerStateChange={this.onPinchHandlerStateChange}>
        <View style={styles.preview}>
          {this.props.children}
        </View>
      </PinchGestureHandler>
    )
  }
}

const styles = StyleSheet.create({
  preview: {
    // marginTop:200,
    height: Dimensions.get('window').height,
    width: "100%",
    // backgroundColor: 'red',
  },
});
