import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { getResources } from '../lib/api';
import Map from '../lib/map';
import Spot from '../components/Spot';
import api from '../lib/api';
import { serialize } from '../lib/support';
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
    var lat = navigation.getParam('lat')
    var lon = navigation.getParam('lon')
    if (lat == "" || lon == "") { lat = -8.634508; lon = 115.192803 }
    this.state = { data: [], latitude: parseInt(lat), longitude: parseInt(lon)}
  }

  componentDidMount = async () => {
    const current_position = await this.ref.getMapBoundaries()
    this.map = new Map(current_position) 
  }

  handleRegionChange = async () => {
    const current_position = await this.ref.getMapBoundaries()
    this.map.current = current_position
    if (this.map.shouldUpdate) { 
      this.map.previous = current_position
      const query = `${serialize(current_position)}`
      const response = await api.getLocationsWithQuery(query)
      const json = await response.json()
      this.setState({ data: json })
    }
  }

  setData = async (json) => {
    this.setState({ data: json })
  }

  addData = (json) => {
    const { data } = this.state
    this.setState({ data: [...data, ...json] })
  }

  render() {
    const { data, latitude, longitude, inOverview } = this.state;
    const region = { 
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 1,
      longitudeDelta: 1 
    }

    return (
      <MapView
        style={{flex: 1}}
        data={this.state.data}
        initialRegion={region}
        ref={(r) => this.ref = r}
        renderMarker={this.renderMarker}
        showCompass={false}
        onRegionChangeComplete={this.handleRegionChange}
      >
        { data && data.map((data) => <Spot key={data.id} data={data} /> )}
      </MapView>
    )
  }
}
