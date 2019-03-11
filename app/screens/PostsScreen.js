/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, AsyncStorage } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { host, headers } from '../config/constants.js';
import { styles } from './styles';
import { Post } from '../components/Post';
import { Container, Content } from 'native-base';
import Dimensions from 'Dimensions';
import Orientation from 'react-native-orientation-locker';
import { MenuButtons, Item } from './../components/MenuButtons';

export default class PostsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'The surf today', 
      headerRight: (
        <MenuButtons>
          <Item title='person' iconName='person' onPress={() => navigation.navigate('User') } />
        </MenuButtons>
      ),
    };
  };

  constructor(props){
    super(props);
    this.state = { posts: '', errors: '' }; 
  }

  componentWillMount(){
    Orientation.lockToPortrait();
  }

  fetchPosts = async () => {
    try {
      const options = { method: 'GET', headers: headers,};
      let response = await fetch(host + '/posts.json', options );
      const responseJson = await response.json();

      if (response.status == 200) { this.createPosts(responseJson); }

      if (response.status == 422) {
        var messages = "";
        for (var element in responseJson) { messages += `the field ${element} ${responseJson[element]}, ` }
        this.setState({ errors: messages });
      }
    
    } catch (errors) {
      console.log(errors);
    }
  }

  createPosts = (json) => {
    const keys = Object.keys(json)
    const postItems = keys.map((key) => 
      <Post key={key} post={json[key]} height={this.windowHeight} />
    );
    this.setState({ posts: postItems})
  }

  render() {
    this.fetchPosts();
    const { navigation } = this.props;
    const { posts } = this.state;
    this.windowHeight = (Dimensions.get('window').height - 253) / 2;

    return (
      <React.Fragment>
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
