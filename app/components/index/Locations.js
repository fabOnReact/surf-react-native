import React, { Component } from 'react';
import { FlatList, View, Text, Alert, TouchableOpacity, Image } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import AsyncStorage from '@react-native-community/async-storage';
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
    this.state = { page: 1, refreshing: false, latitude: '', longitude: '', locations: [], nearby_locations: [], imperial: true };
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

  updateSettings = async () => {
    const unit = await AsyncStorage.getItem('imperial')
    const imperial = JSON.parse(unit)
    this.setState({ imperial })
  }

  _setGps = async ({ latitude, longitude }) => {
    this.setState({ latitude, longitude })
  }

  // _nearbyLocations = async () => {
  //   api.per_page = 20
  //   api.page = 1
  //   const request  = await api.getLocationsNearby()
  //   const nearby_locations = await request.json()
  //   this.setState({ nearby_locations })
  // }

  _setLocations = async () => {
    const { locations, page } = this.state
    const { loaded } = this.props
    api.page =  page
    const locations_request =  await api.getLocations({ flags: ["with_cameras=true"] })
    const new_locations = await locations_request.json()
    this.setState({ locations: [...locations, ...new_locations] })
    loaded()
  }

  componentDidMount() {
    getGps(this._setGps)
    this.updateSettings()
  }

  componentDidUpdate = async (prevProp, prevState) => {
    const { page, locations } = this.state
    const locations_missing = locations.length == 0
    const page_refresh = locations_missing && page == 1
    const next_page = prevState.page < page
    // const latitude_change = prevState.latitude != latitude
    // const longitude_change = prevState.longitude != longitude
    // const gps_change = latitude_change && longitude_change
    api.params = this.params
    if(page_refresh || next_page) {
      this._setLocations()
    }
    // if(gps_change) {
    //   this._nearbyLocations()
    // }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    this.timer_on = 0;
  }

  _handleRefresh = () => {
    this.setState({
      page: 1, locations: []
    });
  }

  _onEndReached = () => {
    const { page } = this.state
    this.setState({ 
      page: page + 1
    })
  }

  navigateToCamera = () => {
    const { navigation } = this.props
    const { nearby_locations } = this.state
    navigation.navigate('Camera')
  }

  navigateToMap = () => {
    const { navigation } = this.props
    const { latitude, longitude, nearby_locations } = this.state
    navigation.navigate("Map", { 
      lat: latitude, 
      lon: longitude, 
      locations: nearby_locations,  
    }) 
  }

  navigateToProfile = () => {
    const { navigation } = this.props
    navigation.navigate("Profile", { 
      updateProfileSettings: this.updateSettings 
    })
  }

  renderList() {
    const { navigation } = this.props
    const { locations, imperial } = this.state
    return (
      <FlatList
        data={locations}
        extraData={imperial}
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
              imperial={imperial}
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
      justifyContent: 'flex-end',
      alignItems: 'center',
    }
    return (
      <React.Fragment>
        { locations_present ? this.renderList() : null }
        <SafeArea
          style={flex}>
          <ProfileButton action={this.navigateToProfile} />
          <MapButton action={this.navigateToMap} />
          <CameraButton 
            action={this.navigateToCamera} 
          />
        </SafeArea>
      </React.Fragment>
    );
  }
}
