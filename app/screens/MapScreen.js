import React, { Component } from 'react';
import { StatusBar, View, Text, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Map from '../lib/map';
import Spot from '../components/Spot';
import Api from '../lib/api';
import { serialize } from '../lib/support';
import { styles } from './styles/MapStyles';

export default class MapScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTintColor: 'black',
      headerTransparent: true,
      headerStyle: { 
        backgroundColor: 'rgba(0,0,0,0.0)',
        marginTop: StatusBar.currentHeight,
      },
    }
  }

  constructor(props) {
    super(props);
    const { navigation } = this.props
    const credentials = navigation.getParam('credentials')
    this.state = { locations: [], latitude: -8.634508, longitude: 115.192803 }
    this.api = new Api(credentials)
  }

  componentDidMount = async () => {
    this.setState({ 
      latitude: this.lat, 
      longitude: this.long 
    })
  }

  get lat() {
    const { navigation } = this.props;
    const lat = navigation.getParam('lat')
    this._lat = !!lat ? parseInt(lat) : -8.634508
    return this._lat
  }

  get long() {
    const { navigation } = this.props;
    const long = navigation.getParam('lon')
    this._long = !!long ? parseInt(long) : -115.192803
    return this._long
  }

  handleRegionChange = async () => {
    const current_position = await this.ref.getMapBoundaries()
    if (!this.map) {
      this.map = new Map(current_position) 
    }
    this.map.current = current_position
    if (this.map.shouldUpdate) { 
      this.map.previous = current_position
      const query = `${serialize(current_position)}`
      const response = await this.api.getLocationsBoundary({ query })
      const json = await response.json()
      this.setState({ locations: json })
    }
  }

  setData = async (json) => {
    this.setState({ locations: json })
  }

  addData = (json) => {
    const { locations } = this.state
    this.setState({ locations: [...locations, ...json] })
  }

  renderSpot(location) {
    const { data: { attributes }} = location
    return (
      <Spot key={attributes.id} data={attributes} /> 
    )
  }

  render() {
    const { locations, latitude, longitude, inOverview } = this.state;
    const region = { 
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 1,
      longitudeDelta: 1 
    }

    return (
      <MapView
        style={{flex: 1}}
        initialRegion={region}
        ref={(r) => this.ref = r}
        showCompass={false}
        onRegionChangeComplete={this.handleRegionChange}
      >
        { locations && locations.map(location => this.renderSpot(location)) } 
      </MapView>
    )
  }
}
