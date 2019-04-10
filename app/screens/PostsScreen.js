/* eslint no-underscore-dangle: 0 */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
import React, { Component } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { Container, Content } from 'native-base';
import Dimensions from 'Dimensions';
import Orientation from 'react-native-orientation-locker';
import { NavigationEvents } from 'react-navigation';
import { MenuButtons, Item } from '../components/MenuButtons';
import Location from '../components/Location';
import Post from '../components/Post';
import { styles } from './styles';
import { getPosts, errorMessage } from '../lib/api'

export default class PostsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'The surf today', 
      headerRight: (
        <MenuButtons>
          <Item title='person' iconName='person' onPress={() => navigation.navigate('Profile')} />
        </MenuButtons>
      ),
    };
  };

  constructor(props){
    super(props);
    this.state = { data: '', page: 1, refreshing: false, latitude: null, longitude: null }; 
    this._setLocation()
    this.windowHeight = (Dimensions.get('window').height - 240) / 2;
  }

  componentWillMount() {
    this._handleRefresh()
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
        });
      },
      (error) => { 
        console.warn(error) 
        Alert.alert(
          'Location Services',
          'Please enable manually location services from your phone settings',
          [{text: 'Dismiss'}],
          {cancelable: true},
        );
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

  render() {
    const { navigation } = this.props;
    const { data } = this.state;
    return (
      <React.Fragment>
        {/*<NavigationEvents onWillFocus={payload => this._handleRefresh() } />*/}
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
          containerStyle={styles.buttonAbsolute}
          name='camera-alt' 
          size={35}
          color='#3333ff'
          reverse
          onPress={() => navigation.navigate('New')}
        />         
      </React.Fragment>
    );
  }
}
