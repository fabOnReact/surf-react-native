import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Table extends Component {

  renderHeader(i) {
    const text = ["SWELL", "WIND"][i]
    return (
      <View key={i}>
        <Text
          style={styles.headerText}>{ text }</Text>
      </View>
    )
  }

  render() {
    const { days, waveHeight } = this.props.daily
    console.warn(this.props.daily)
    return (
      <View 
        styles={styles.container}>
        <View
          style={styles.headerRow}>
          { [...Array(3)].map((_, i) => this.renderHeader(i) ) }
        </View>
        <View 
          style={styles.dayRow}>
          <View
            style={styles.forecast}>
            <View 
              style={styles.swell}>
            </View>
            <View 
              style={styles.wind}>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  headerRow: {
    marginTop:10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 40, 
    backgroundColor: "#bfbfbf",
    borderColor: "#737373",
    borderWidth: 0.3,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 1
  }
});
