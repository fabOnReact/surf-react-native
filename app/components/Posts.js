/* eslint no-underscore-dangle: 0 */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
import React, { Component } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';
import Location from './Location';
import Post from './Post';
import { buttons } from './styles/ButtonStyles';
import { getResources } from '../lib/api';
import { errorMessage } from '../lib/support';

export default class PostsScreen extends Component {
  constructor(props){
    super(props);
    this.state = { data: [], page: 1, refreshing: false, latitude: '', longitude: '' };
  }

  componentWillMount = () => {
    this._setLocation()
  }

  addData = (json) => {
    const { data } = this.state
    this.setState({ data: [...data, ...json], refreshing: false })
  }

  setData = async (json) => {
    const { data } = this.state 
    const { navigation } = this.props
    if (json["error"] != null) { 
      await AsyncStorage.clear()
      navigation.navigate('Auth');
    }
    else {
      this.setState({ data: json, refreshing: false })
    }
  }

  _setLocation = function() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ 
          latitude: position.coords.latitude, 
          longitude: position.coords.longitude, 
        }, () => this._handleRefresh());
      },
      (error) => { 
        Alert.alert(
          'Location Services',
          'Please enable manually location services from your phone settings',
          [{text: 'Dismiss'}],
          {cancelable: true},
        );
        this._handleRefresh();
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  _handleRefresh = () => {
    const { navigation } = this.props
    this.setState({ page: 1, refreshing: true, }, () => {
      getResources(this.setData, this.params, "posts")
    })
  }

  _handleLoadMore = () => {
    const { page } = this.state
    const { navigation } = this.props
    this.setState({ page: page + 1 }, () => {
      getResources(this.addData, this.params, "posts")
    })
  }

  get params () {
    const { page, longitude, latitude } = this.state;
    return `?page=${page}&per_page=4&longitude=${longitude}&latitude=${latitude}`
  }

  _onEndReached = () => {
    this._handleLoadMore()
  };

  navigateToCamera = () => {
    this.props.navigation.navigate('New')
  }

  // <NavigationEvents onWillFocus={payload => this._handleRefresh() } />
  render() {
    const { navigation } = this.props;
    const { data, latitude } = this.state;
    return (
      <React.Fragment>
        <FlatList
          data={this.state.data} 
          keyExtractor={(item, index) => index.toString() }
          refreshing={this.state.refreshing}
          onRefresh={this._handleRefresh}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={0.5}
          renderItem={({ item, index }) => (
            <Post key={index} post={item} />
          )}
        />
        <TouchableOpacity 
          onPress={() => navigation.navigate("Profile") }
          style={buttons.containerRight}>
          <Image 
            style={buttons.buttonRight} 
            source={require('../images/profile-user.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation.navigate("Map") }
          style={buttons.containerLeft}>
          <Image 
            style={buttons.buttonLeft} 
            source={require('../images/planet-earth.png')}
          />
        </TouchableOpacity>
        <Icon
          containerStyle={buttons.buttonReverseAbsolute}
          name='camera-retro'
          type='font-awesome'
          size={40}
          color='white'
          iconColor='black'
          reverseColor='black'
          reverse
          onPress={() => navigation.navigate("Camera") }
        />
      </React.Fragment>
    );
  }
}
