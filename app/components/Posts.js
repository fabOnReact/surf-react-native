/* eslint no-underscore-dangle: 0 */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
import React, { Component } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from 'react-native-geolocation-service';
import { Card } from 'native-base';
import { Icon } from 'react-native-elements';
import { Header } from 'react-navigation';
import Location from './Location';
import Post from './Post';
import Forecast from './Forecast';
import { buttons } from './styles/ButtonStyles';
import { getResources } from '../lib/api';
import { errorMessage } from '../lib/support';

export default class PostsScreen extends Component {
  constructor(props){
    super(props);
    this.state = { posts: [], page: 1, refreshing: false, latitude: '', longitude: '', locations: '' };
    this.count = 0
  }

  componentDidMount() {
    this.setCoordinates()
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

  setLocations = (json) => {
    const { locations } = this.state
    this.setState({ locations: json })
    const repeatRequest = setTimeout(()=>{
      getResources(this.setLocations, this.path("locations"))
      this.count += 1
    }, 3000)
    if (json.length == 0 && this.count < 4) { repeatRequest() } 
    else { clearTimeout(repeatRequest) }
  }

  setCoordinates = function() {
    const { posts } = this.state
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({ 
          latitude: position.coords.latitude, 
          longitude: position.coords.longitude, 
        }, () => {
          getResources(this.setLocations, this.path("locations"))
        });
      },
      (error) => { 
        // console.warn(error)
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    if (posts.length == 0) { 
      this.setState({ refreshing: true }, () => getResources(this.setPosts, this.path("posts")))
    }
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
    if(!this.state.refreshing) { this._handleLoadMore() }
  };

  navigateToCamera = () => {
    this.props.navigation.navigate('New')
  }

  render() {
    const { navigation } = this.props;
    const { posts, locations, latitude, longitude } = this.state;
    return (
      <React.Fragment>
        <FlatList
          data={posts} 
          keyExtractor={(item, index) => index.toString() }
          refreshing={this.state.refreshing}
          onRefresh={this._handleRefresh}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={0.01}
          extraData={locations}
          renderItem={({ item, index }) => (
            <Card trasparent style={{flex: 1}}>
              <TouchableOpacity onPress={() => navigation.navigate("Nearby", { locations: locations }) }>
                <Forecast locations={locations} index={index} />
              </TouchableOpacity>
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
          onPress={() => navigation.navigate("Map", { lat: latitude, lon: longitude }) }
          style={buttons.containerLeft}>
          <Image 
            style={buttons.buttonLeft} 
            source={require('../images/location.png')}
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
          raised
          onPress={() => navigation.navigate("Camera") }
        />
        <Icon
          containerStyle={buttons.buttonReverseAbsolute}
          name='camera-retro'
          type='font-awesome'
          size={40}
          color='white'
          iconColor='black'
          reverseColor='black'
          reverse
          raised
          onPress={() => navigation.navigate("Camera") }
        />
      </React.Fragment>
    );
  }
}
