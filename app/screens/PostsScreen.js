/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, AsyncStorage } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { getPosts } from '../lib/api'
import { styles } from './styles';
import { Post } from '../components/Post';
import { Container, Content } from 'native-base';
import Dimensions from 'Dimensions';
import Orientation from 'react-native-orientation-locker';
import { MenuButtons, Item } from './../components/MenuButtons';
import { NavigationEvents } from 'react-navigation';

export default class PostsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'The surf today', 
      headerRight: (
        <MenuButtons>
          <Item title='person' iconName='person' onPress={() => navigation.navigate('Profile') } />
        </MenuButtons>
      ),
    };
  };

  constructor(props){
    super(props);
    this.state = { posts: '', errors: '' }; 
  }

  createPosts = (json) => {
    const keys = Object.keys(json)
    const postItems = keys.map((key) => 
      <Post key={key} post={json[key]} height={this.windowHeight} />
    );
    this.setState({ posts: postItems})
  }

  render() {
    const { navigation } = this.props;
    const { posts } = this.state;
    Orientation.lockToPortrait();
    this.windowHeight = (Dimensions.get('window').height - 253) / 2;

    return (
      <React.Fragment>
      <NavigationEvents onWillFocus={payload => getPosts(this.createPosts) } />
      <View style={{flex:1}}>
        <Container style={styles.cardContainer} >
          <Content style={{flex:1}}>{ posts != "" && posts }</Content>
        </Container>
        <Icon
          containerStyle={styles.buttonAbsolute}
          name='camera-alt' 
          size={35}
          color='#3333ff'
          reverse={true}
          onPress={() => navigation.navigate('New')}
        />         
      </View>
      </React.Fragment>
    );
  }
}
