import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';

export default class Swell extends Component {
  render() {
    const { swellHeight, period, styles} = this.props
    const forecast = `${swellHeight} mt. @ ${parseInt(period)} s.`
    return (
      <Text style={styles}>
        { forecast }
      </Text>
    )
  }
}
