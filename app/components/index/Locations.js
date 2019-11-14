import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Text, Alert, TouchableOpacity, Image } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import ProfileButton from '../buttons/ProfileButton';
import MapButton from '../buttons/MapButton';
import CameraButton from '../buttons/CameraButton';
import MenuButton from '../buttons/MenuButton';
import Cameras from './Cameras';
import { getGps } from '../../lib/support';
import SafeArea from '../SafeArea';
import Api from '../../lib/api';
import auth from '../../screens/IndexScreen';

export default class Locations extends Component {
  constructor(props){
    super(props);
    this.state = { page: 0, refreshing: false, latitude: '', longitude: '', locations: [], data: null, imperial: true };
    this.count = 0
    this.timer_on = 0;
    const { credentials } = this.props
    this.api = new Api(credentials)
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

  _updateSettings = async () => {
    const unit = await AsyncStorage.getItem('imperial')
    const imperial = JSON.parse(unit)
    this.setState({ imperial })
  }

  _setGps = async ({ latitude, longitude }) => {
    this.setState({ latitude, longitude })
  }

  _setData = async () => {
    const request =  await this.api.getLocations({ flags: ["with_cameras=true"] })
    this.data = await request.json()
  }

  get begin() {
    const { page } = this.state
    return page * 2
  }

  get end () {
    return this.begin + 2
  }

  _setLocations = () => {
    const { locations } = this.state
    const { loaded } = this.props
    const new_locations = this.data.slice(this.begin, this.end)
    this.setState({ locations: [...locations, ...new_locations ]})
    loaded()
  }

  componentDidMount = async () => {
    getGps(this._setGps)
    this._updateSettings()
    await this._setData()
    this._setLocations()
  }

  componentDidUpdate = async (prevProp, prevState) => {
    const { page, data, locations } = this.state
    const next_page = prevState.page < page
    this.api.params = this.params
    if(next_page) {
      this._setLocations()
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    this.timer_on = 0;
  }

  _handleRefresh = async () => {
    this.setState({
      page: 0, locations: []
    });
    await this._setData()
    this._setLocations()
  }

  _onEndReached = () => {
    const { page } = this.state
    this.setState({ 
      page: page + 1
    })
  }

  navigateToCamera = () => {
    const { navigation, credentials } = this.props
    navigation.navigate('Camera', { credentials })
  }

  navigateToMap = () => {
    const { navigation, credentials } = this.props
    const { latitude, longitude, nearby_locations } = this.state
    navigation.navigate("Map", { 
      lat: latitude, 
      lon: longitude, 
      credentials,
    }) 
  }

  navigateToProfile = () => {
    const { navigation } = this.props
    navigation.navigate("Profile", { 
      updateProfileSettings: this._updateSettings 
    })
  }

  navigateToMenu = () => {
    const { navigation, credentials } = this.props
    const { imperial } = this.state
    navigation.navigate("Menu", { imperial, credentials })
  }

  renderList() {
    const { navigation, credentials } = this.props
    const { locations, imperial } = this.state
    const new_props = { navigation, credentials, locations, imperial }
    return (
      <FlatList
        data={locations}
        extraData={[imperial, credentials]}
        keyExtractor={(item, index) => index.toString() }
        refreshing={this.state.refreshing}
        onRefresh={this._handleRefresh}
        onEndReached={this._onEndReached}
        pagingEnabled
        renderItem={({ item, index }) => {
          return ( 
            <Cameras 
              location={item} 
              { ...new_props }
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
        <View style={styles.container}>
          <MenuButton 
            action={this.navigateToMenu}
          />
        </View>
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

const has_notch = DeviceInfo.hasNotch()
export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: has_notch ? 60 : 30,
    width: "100%",
    zIndex: 4,
    height: 50,
  }, 
})
