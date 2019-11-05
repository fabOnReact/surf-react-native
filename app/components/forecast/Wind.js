import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { H3 } from 'native-base';
import { header } from './styles';

export default class Wind extends Component {
  render() {
    const { windSpeed, styles } = this.props
    return (
      <React.Fragment>
        <Text style={styles}>
          { windSpeed } m/s wind
        </Text>
      </React.Fragment>
    )
  }
}
