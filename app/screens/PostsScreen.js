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
    this.state = { data: '', page: 1, refreshing: false }; 
    this.refreshPage = this.refreshPage.bind(this)
  }

  componentWillMount() {
    this.windowHeight = (Dimensions.get('window').height - 240) / 2;
  }

  setData = (json) => {
    const { data } = this.state
    this.setState({ data: [...data, ...json], refreshing: false })
  }

  handleRefresh = () => {
    this.setState({
      page: 1,
      refreshing: true,
    })
    getPosts(this.setData, this.params)
  }

  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1,
    }, () => {
      getPosts(this.setData, this.params)
    })
  }

  get params () {
    const { page } = this.state;
    return `?page=${page}&per_page=5`
  }

  _triggerPageRefresh() {
    Orientation.lockToPortrait();
    getPosts(this.setData, this.params)
  }

  render() {
    const { navigation } = this.props;
    const { data } = this.state;
    return (
      <React.Fragment>
        <NavigationEvents onWillFocus={payload => this._triggerPageRefresh() } />
        <FlatList
          data={this.state.data} 
          keyExtractor={item => item.id.toString()}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          onEndReached={this.handleLoadMore}
          onEndThreshold={0}
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
