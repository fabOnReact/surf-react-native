/* eslint no-underscore-dangle: 0 */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
import React, { Component } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Dimensions from 'Dimensions';
import Location from './Location';
import Post from './Post';
import { buttons } from './styles/ButtonStyles';
import { getPosts, errorMessage } from '../lib/api';

export default class PostsScreen extends Component {
  constructor(props){
    super(props);
    this.state = { data: '', page: 1, refreshing: false, latitude: '', longitude: '' };
    this.windowHeight = (Dimensions.get('window').height ) / 3 - 17;
  }

  componentWillMount() {
    this._setLocation()
  }

  addData = (json) => {
    const { data } = this.state
    this.setState({ data: [...data, ...json], refreshing: false })
  }

  setData = (json) => {
    const { data } = this.state
    this.setState({ data: json, refreshing: false })
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
    this.setState({ page: 1, refreshing: true, }, () => {
      getPosts(this.setData, this.params)
    })
  }

  _handleLoadMore = () => {
    const { page } = this.state
    this.setState({ page: page + 1, }, () => {
      getPosts(this.addData, this.params)
    })
  }

  get params () {
    const { page, longitude, latitude } = this.state;
    return `?page=${page}&per_page=3&longitude=${longitude}&latitude=${latitude}`
  }

  _onEndReached = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      this._handleLoadMore()
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  navigateToCamera = () => {
    this.props.navigation.navigate('New')
  }

  //<NavigationEvents onWillFocus={payload => this._handleRefresh() } />
  render() {
    const { navigation } = this.props;
    const { data } = this.state;
    return (
      <React.Fragment>
        <FlatList
          data={this.state.data} 
          keyExtractor={(item, index) => index.toString() }
          refreshing={this.state.refreshing}
          onRefresh={this._handleRefresh}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
          renderItem={({ item, index }) => (
            <Post key={index} post={item} height={this.windowHeight} />
          )}
        />
        <Icon
          containerStyle={buttons.buttonLeft}
          name='compass'
          type='material-community'
          size={36}
          color='#ffffff'
          underlayColor='transparent'
          onPress={() => navigation.navigate("Profile") }
        />
        <Icon
          containerStyle={buttons.buttonRight}
          name='user-circle'
          type='font-awesome'
          size={30}
          color='#ffffff'
          underlayColor='transparent'
          onPress={() => navigation.navigate("Profile") }
        />
        <Icon
          containerStyle={buttons.buttonAbsolute}
          name='camera-retro'
          type='font-awesome'
          size={40}
          color='white'
          iconStyle={{color: 'black'}}
          underlayColor='transparent'
          reverse
          onPress={() => navigation.navigate("Camera") }
        />
      </React.Fragment>
    );
  }
}