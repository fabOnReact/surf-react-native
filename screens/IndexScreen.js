/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, AsyncStorage, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { host, headers } from '../redux/constants.js';
import { styles } from './styles';
import { Post } from '../components/Post';
import { Container, Content } from 'native-base';

export default class IndexScreen extends Component {
  static navigationOptions = { title: 'The surf today', }

  constructor(props){
    super(props);
    this.state = { posts: '', errors: '' }; 
  }

  componentWillMount(){ this.fetchPosts(); }

  fetchPosts = async () => {
    try {
      console.log('fetch_posts');
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
      <Post key={key} post={json[key]} />
    );
    this.setState({ posts: postItems})
  }

  render() {
    console.log('render')
    const { navigation } = this.props;
    const { posts } = this.state;

    return (
      <React.Fragment>
      <View style={{flex:1}}>
        <Container style={styles.cardContainer} >
          <Content>{ posts != "" && posts }</Content>
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