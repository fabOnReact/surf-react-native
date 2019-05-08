import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import ClusteredMapView from 'react-native-maps-super-cluster';
import { getResources } from '../lib/api';
import { styles } from './styles/MapStyles';
import { serialize } from '../lib/support';

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
    const lat = navigation.getParam('lat', -8)
    const lon = navigation.getParam('lon', 115)
    let empty = [{ name: '', location: { latitude: 0, longitude: 0 }}]
    this.state = { data: empty, latitude: lat, longitude: lon, mapBoundaries: { southWest: null, northEast: null }}
  }

  getMarkers = () => {
    this.ref.getMapRef().getMapBoundaries().then((data) => { 
      this.setState({ mapBoundaries: data }, () => { 
        getResources(this.setData, this.corners, "locations")
      })
    })
  }

  setData = (json) => {
    const { data } = this.state
    this.setState({ data: json })
  }

  get corners() {
    const { mapBoundaries } = this.state;
    return `?${serialize(mapBoundaries)}`
  }

  renderCluster = (cluster, onPress) => {
    const pointCount = cluster.pointCount,
      coordinate = cluster.coordinate,
      clusterId = cluster.clusterId

    return (
      <Marker identifier={`cluster-${clusterId}`} coordinate={coordinate} onPress={onPress}>
        <View style={styles.clusterContainer}>
          <Text style={styles.clusterText}>
            {pointCount}
          </Text>
        </View>
      </Marker>
    )
  }

  renderMarker = (data) => {
    return (
      <Marker key={data.id || Math.random()} coordinate={data.location}>
        <Image source={require('../images/surfboard.png')}
          style={{ height: 30, width: 30 }}
        />
      </Marker>
    )
  }

  render() {
    const { data, latitude, longitude } = this.state;
    const region = { 
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 1,
      longitudeDelta: 1
    }

    return (
      <ClusteredMapView
        style={{flex: 1}}
        data={this.state.data}
        initialRegion={region}
        ref={(r) => this.ref = r}
        renderMarker={this.renderMarker}
        renderCluster={this.renderCluster} 
        showCompass={false}
        onRegionChangeComplete={this.getMarkers}
      />
    )
  }
}
