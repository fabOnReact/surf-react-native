/* eslint no-underscore-dangle: 0 */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
import React, { Component } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import Permissions from 'react-native-permissions';
import { Card } from 'native-base';
import { Icon } from 'react-native-elements';
import { Header } from 'react-navigation';
import Location from './Location';
import Post from './Post';
import Forecast from './Forecast';
import { buttons } from './styles/ButtonStyles';
import { getResources } from '../lib/api';
import { errorMessage } from '../lib/support';
// import { posts_fixtures } from '../../test/fixtures/posts.js';

export default class PostsScreen extends Component {
  constructor(props){
    super(props);
    this.state = { posts: [], page: 1, refreshing: false, latitude: '', longitude: '', locations: '', locationPermission: null };
  }

  componentDidMount() {
    Permissions.check('location', {type: 'whenInUse'}).then(response => {
      this.setState({locationPermission: response});
    }, () => {
      // console.warn(this.state.locationPermission)
    });
    this._setLocation()
  }

  _requestPermission = () => {
    Permissions.request('location', {type: 'whenInUse'}).then(response => {
      this.setState({locationPermission: response})
    });
  }
  
  _alertForLocationPermission() {
    Alert.alert(
      'Can we access your location?',
      'We need access so can select the most relevant forecast information for you',
      [
        {
          text: 'No',
          onPress: () => {}, // console.warn('Permission denied')
          style: 'cancel',
        },
        this.state.locationPermission == 'undetermined'
          ? {text: 'Yes', onPress: this._requestPermission}
          : {text: 'Open Settings', onPress: Permissions.openSettings},
      ],
    );
  }

  addPosts = (json) => {
    const { posts } = this.state
    this.setState({ posts: [...posts, ...json], refreshing: false })
  }

  setPosts = async (json) => {
    const { posts } = this.state 
    const { navigation, loaded } = this.props
    if (json["error"] != null) { 
      //console.warn(json["error"])
      await AsyncStorage.clear()
      navigation.navigate('Auth');
    }
    else {
      this.setState({ posts: json, refreshing: false })
    }
    loaded()
  }

  setLocations = async (json) => {
    const { locations } = this.state
    this.setState({ locations: json })
  }

  _setLocation = function() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ 
          latitude: position.coords.latitude, 
          longitude: position.coords.longitude, 
        }, () => {
          getResources(this.setLocations, this.path("locations"))
          this._handleRefresh()
        });
      },
      (error) => { 
        this._alertForLocationPermission()
        // console.warn(error)
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  _handleRefresh = () => {
    const { navigation } = this.props
    this.setState({ page: 1, refreshing: true, }, () => {
      getResources(this.setPosts, this.path("posts"))
    })
  }

  _handleLoadMore = () => {
    const { page } = this.state
    const { navigation } = this.props
    this.setState({ page: page + 1 }, () => {
      getResources(this.addPosts, this.path("posts"))
    })
  }

  path(endpoint) {
    const { page, longitude, latitude } = this.state;
    switch (endpoint) {
      case "posts":
        return `${endpoint}.json?page=${page}&per_page=4&longitude=${longitude}&latitude=${latitude}`
        break
      case "locations": 
        return `${endpoint}.json?page=1&per_page=6&longitude=${longitude}&latitude=${latitude}`
        break
      default: 
        // console.warn(`sorry, ${endpoint} does not exist`)
    }
  }

  get locationsQuery () {
    const { longitude, latitude } = this.props;
  }

  _onEndReached = () => {
    this._handleLoadMore()
  };

  navigateToCamera = () => {
    this.props.navigation.navigate('New')
  }

  render() {
    const { navigation } = this.props;
    const { posts, locations, latitude, longitude } = this.state;
    // const { locations, latitude, longitude } = this.state;
    // const posts = posts_fixtures
    return (
      <React.Fragment>
      <View style={{flex:1}}>
        <FlatList
          data={posts} 
          keyExtractor={(item, index) => index.toString() }
          refreshing={this.state.refreshing}
          onRefresh={this._handleRefresh}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={0.5}
          extraData={locations}
          renderItem={({ item, index }) => (
            <Card trasparent>            
              <Forecast data={locations} index={index} />
              <Post key={index} post={item} index={index} navigation={navigation} />
            </Card>
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
      </View>
      </React.Fragment>
    );
  }
}
