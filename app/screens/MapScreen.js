import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { getResources } from '../lib/api';
import Spot from '../components/Spot';

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default class MapScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'rgba(0,0,0,0.0)',
    },
    headerTintColor: 'black',
    headerTransparent: true,
  };

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    // const lat = navigation.getParam('lat', -8)
    // const lon = navigation.getParam('lon', 115)
    // this.state = { data: null, latitude: lat, longitude: lon }
    this.state = { data: null, latitude: -8.7333, longitude: 115.166 }
  }

  componentWillMount() {
    getResources(this.setData, this.params, "locations")
  }

  setData = (json) => {
    const { data } = this.state
    this.setState({ data: json })
  }

  get params () {
    const { longitude, latitude } = this.state;
    return `?longitude=${longitude}&latitude=${latitude}`
  }

  render() {
    const { data, latitude, longitude } = this.state;
    return (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
        provider={PROVIDER_GOOGLE}
        // showUserLocation={true}
        showCompass={false}
      >
        { data && data.map((spot, index) => <Spot key={index} data={spot} /> )}
      </MapView>
    );
  }
}
