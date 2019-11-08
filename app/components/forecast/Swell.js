import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import Unit from '../../lib/unit';

export default class Swell extends Component {
  render() {
    const { text, styles} = this.props
    return (
      <Text style={styles}>
        { text }
      </Text>
    )
  }
}
