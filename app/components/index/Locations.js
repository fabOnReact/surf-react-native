import React, { Component } from 'react';
import { FlatList, View, Text, Alert, TouchableOpacity, Image } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import ProfileButton from '../buttons/ProfileButton';
import MapButton from '../buttons/MapButton';
import CameraButton from '../buttons/CameraButton';
import Cameras from './Cameras';
import { getGps } from '../../lib/support';
import SafeArea from '../SafeArea';
import api from '../../lib/api';

export default class Locations extends Component {
  constructor(props){
    super(props);
    this.state = { page: 1, refreshing: false, latitude: '', longitude: '', locations: [], nearby_locations: [] };
    this.count = 0
    this.timer_on = 0;
    changeNavigationBarColor('#ffffff');
  }

  get params() {
    const { latitude, longitude, page } = this.state
    return { 
      latitude, 
      longitude, 
      page, 
    }
  }

  _setGps = async ({ latitude, longitude }) => {
    this.setState({ latitude, longitude })
  }

  _setLocations = async () => {
    const { post, page } = this.state
    const { loaded } = this.props
    const locations_request =  await api.getLocations({ flags: ["&with_cameras=true"] })
    var locations = await locations_request.json()
    var nearby_locations_request = await api.getLocations({ flags: [""] })
    const nearby_locations = await nearby_locations_request.json()
    this.setState({ locations, nearby_locations })
    loaded()
  }

  componentDidMount() {
    getGps(this._setGps)
  }

  componentDidUpdate = async (prevProp, prevState) => {
    const { locations, latitude, longitude, page } = this.state
    const repeat_request = locations.length == 0 && this.count < 4
    const latitude_change = prevState.latitude != latitude
    const longitude_change = prevState.longitude != longitude
    const gps_updated = latitude_change && longitude_change
    const find_locations = gps_updated && !this.timer_on
    const page_updated = prevState.page != page
    api.params = this.params
    // console.warn('this.params', this.params);
    // if(find_locations) { 
    //   this.timer_on = 1
    //   this.timedRequest()
    // }
    if(gps_updated || page == 0) {
      this._setLocations()
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    this.timer_on = 0;
  }

  // timedRequest = async () => {
  //   const { locations, latitude, longitude } = this.state
  //   const locations_missing = locations.length == 0
  //   const repeat_request = this.count < 4 && locations_missing
  //   if(repeat_request) { 
  //     await this._setLocations({ latitude, longitude })
  //     this.timer = setTimeout(() => this.timedRequest(), 1000);
  //     this.count = this.count + 1;
  //   }
  // }

  _handleRefresh = () => {
    this.setState({
      page: 0, locations: []
    });
  }

  navigateToCamera = () => {
    const { navigation } = this.props
    const { nearby_locations } = this.state
    navigation.navigate('Camera', {
      locations: nearby_locations,
    })
  }

  renderList() {
    const { navigation } = this.props
    const { locations } = this.state
    return (
      <FlatList
        data={locations}
        keyExtractor={(item, index) => index.toString() }
        refreshing={this.state.refreshing}
        onRefresh={this._handleRefresh}
        onEndReached={this._onEndReached}
        onEndReachedThreshold={0.01}
        pagingEnabled
        renderItem={({ item, index }) => {
          return ( 
            <Cameras 
              locations={locations}
              location={item} 
              navigation={navigation}
            />
          )
        }}
      />
    )
  }

  render() {
    const { navigation } = this.props;
    const { latitude, longitude, refreshing, locations, nearby_locations } = this.state;
    const locations_present = locations.length > 0
    const flex = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }
    return (
      <React.Fragment>
        { locations_present ? this.renderList() : null }
        <SafeArea
          style={flex}>
          <ProfileButton navigation={navigation} />
          <MapButton 
            navigation={navigation} 
            locations={nearby_locations}
            latitude={latitude} 
            longitude={longitude}
          />
          <CameraButton 
            action={this.navigateToCamera} 
          />
        </SafeArea>
      </React.Fragment>
    );
  }
}
