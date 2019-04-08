/* eslint no-underscore-dangle: 0 */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import { Container, Content } from 'native-base';
import Dimensions from 'Dimensions';
import Orientation from 'react-native-orientation-locker';
import { NavigationEvents } from 'react-navigation';
import { MenuButtons, Item } from '../components/MenuButtons';
import Location from '../components/Location';
import Post from '../components/Post';
import { styles } from './styles';
import { getPosts } from '../lib/api'

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
    this.setLocation = this.setLocation.bind(this)
    this.state = { data: '', page: 1, refreshing: false, latitude: null, longitude: null }; 
    this.windowHeight = (Dimensions.get('window').height - 240) / 2;
  }

  addData = (json) => {
    const { data } = this.state
    this.setState({ data: [...data, ...json], refreshing: false })
  }

  setData = (json) => {
    const { data } = this.state
    this.setState({ data: json, refreshing: false })
  }

  setLocation(coords) {
    this.setState({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  }

  _handleRefresh = () => {
    Orientation.lockToPortrait();
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
        <Location setLocation={this.setLocation} />
        <NavigationEvents onWillFocus={payload => this._handleRefresh() } />
        <FlatList
          data={this.state.data} 
          keyExtractor={item => item.id.toString()}
          refreshing={this.state.refreshing}
          onRefresh={this._handleRefresh}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
          renderItem={({ item }) => (
            <Post post={item} height={this.windowHeight} />
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
