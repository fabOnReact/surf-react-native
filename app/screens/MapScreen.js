import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import ClusteredMapView from 'react-native-maps-super-cluster';
import { getResources } from '../lib/api';
import { styles } from './styles/MapStyles';
import { serialize } from '../lib/support';
import Map from '../lib/map';

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
    this.state = { data: empty, latitude: lat, longitude: lon, boundaries: { southWest: null, northEast: null }}
  }

  getMarkers = () => {
    this.ref.getMapRef().getMapBoundaries().then((coords) => {
      const { boundaries } = this.state
      const { southWest, northEast } = boundaries 
      if (this.position) { 
        const map = new Map(coords, this.position) 
        if (map.change) { 
          this.position = coords
          getResources(this.setData, this.corners, "locations")
        }
      } else {
        this.setState({ boundaries: coords }) 
        this.position = coords 
        getResources(this.setData, this.corners, "locations")
      }
    })
  }

  setData = (json) => {
    thi.setState({ data: json })
  }

  addData = (json) => {
    const { data } = this.state
    this.setState({ data: [...data, ...json] })
  }

  get corners() {
    return `?${serialize(this.position)}`
  }

  renderCluster = (cluster, onPress) => {
    const pointCount = cluster.pointCount,
      coordinate = cluster.coordinate,
      clusterId = cluster.clusterId

    const clusteringEngine = this.ref.getClusteringEngine(),
          clusteredPoints = clusteringEngine.getLeaves(clusterId, 100)

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
      <Marker key={data.id || Math.random()}
        coordinate={data.location}
        title={data.name}
      >
        {/*<Image source={require('../images/surfboard.png')}
          style={{ height: 30, width: 30 }}
        />*/}
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
        // onRegionChangeComplete={this.getMarkers}
      />
    )
  }
}
