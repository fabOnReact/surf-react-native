import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { Marker } from 'react-native-maps';

export default class Spot extends Component {
  render() {
    const { data, inOverview } = this.props;
    return (
      <Marker 
        key={data.id}
        title={data.name} 
        coordinate={{ latitude: data.latitude, longitude: data.longitude }}
      />
    );
  }
}
