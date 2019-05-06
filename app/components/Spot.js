import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Marker } from 'react-native-maps';

export default class Spot extends Component {
  render() {
    const { data } = this.props;
    return (
      <Marker 
        title={data.name} 
        coordinate={{ latitude: data.latitude, longitude: data.longitude }}
      >
        <Image 
          source={require('../images/surfboard.png')}
          style={{ height: 30, width: 30 }}
        />
      </Marker>
    );
  }
}
