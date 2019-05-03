import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

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

  render() {
    const { navigation } = this.props;
    const latitude = navigation.getParam('lat', 37.78825)
    const longitude = navigation.getParam('lon', -122.4324)
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
      >
        <Marker 
          title={'test'} 
          coordinate={{ latitude: latitude, longitude: longitude }}
        >
          <Image 
            source={require('../images/tsunami.png')}
            style={{ height: 40, width: 40 }}
          />
        </Marker>
      </MapView>
    );
  }
}
