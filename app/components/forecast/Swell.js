import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import Unit from '../../lib/unit';

export default class Swell extends Component {
  render() {
    const { swellHeight, period, styles} = this.props
    const swell = new Unit({ european: false, unit: "ft.", value: swellHeight })
    const forecast = `${swell.value} ${swell.unit} @ ${parseInt(period)} s.`
    return (
      <Text style={styles}>
        { forecast }
      </Text>
    )
  }
}
