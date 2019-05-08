import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import ClusteredMapView from 'react-native-maps-super-cluster';
import { getResources } from '../lib/api';
import { styles } from './styles/MapStyles';

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
    // this.state = { data: empty, latitude: lat, longitude: lon }
    this.state = { data: empty, latitude: -8.7333, longitude: 115.166, mapBoundaries: { southWest: 0, northEast: 0 }}
  }

  componentDidMount() { 
    this.ref.getMapRef().getMapBoundaries().then((data) => console.warn(data))
  }

  getNewCoordinates = () => {
    this.ref.getMapRef().getMapBoundaries().then((data) => { 
      this.setState({ mapBoundaries: data })
    }, getResources(this.setData, this.params, "locations"))
  }

  componentWillMount() {
    getResources(this.setData, this.params, "locations")
  }

  setData = (json) => {
    const { data } = this.state
    console.warn(json)
    this.setState({ data: json })
  }

  get params () {
    const { mapBoundaries } = this.state;
    // const { southWest, northEast } = this.state.mapBoundaries;
    console.warn(jQuery.param(mapBoundaries))
    // refactor based on 
    // https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object#
    return `?south_west[latitude]=${southWest.latitude}&south_west[longitude]=${southWest.longitude}&north_east[latitude]=${northEast.latitude}&north_east[longitude]=${northEast.longitude}`
  }

  renderCluster = (cluster, onPress) => {
    const pointCount = cluster.pointCount,
      coordinate = cluster.coordinate,
      clusterId = cluster.clusterId

    // const clusterEngine = this.map.getClusteringEngine(),
    //   clusteredPoints = clusteringEngine.getLeaves(clusterId, 100)

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

  onRegionChangeComplete = async region => {
    let b = await this.map.getMarkersFrames();
    console.warn(b)
  }

  getLocation = () => {
    console.warn(this.map)
  }

  render() {
    const { data, latitude, longitude } = this.state;
    const region = { 
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 12,
      longitudeDelta: 12
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
        onRegionChangeComplete={this.getNewCoordinates}
      />
    )
  }
}
