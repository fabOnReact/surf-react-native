/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { host, headers } from '../redux/constants.js';
import { styles } from './styles';
import { Post } from '../components/Post';

export default class IndexScreen extends Component {
  static navigationOptions = { title: 'Welcome to the app!', }

  constructor(props){
    super(props);
    this.state = { posts: '', errors: '', list: '' }; 
  }


  componentWillMount(){
    console.log('componentWillMount')
    this.fetchPosts();
  }

  componentDidUpdate() {
    console.log('componentDidUpdate')

  }

  fetchPosts = async () => {
    try {
      console.log('fetch_posts');
      const options = { method: 'GET', headers: headers,};
      let response = await fetch(host + '/posts.json', options );
      const responseJson = await response.json();

      if (response.status == 200) { 
        // this.setState({ posts: responseJson })
        this.createList(responseJson);
      }

      if (response.status == 422) {
        var messages = "";
        for (var element in responseJson) { messages += `the field ${element} ${responseJson[element]}, ` }
        this.setState({ errors: messages });
      }
    
    } catch (errors) {
      console.log(errors);
    }
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    const { navigation } = this.props;
    navigation.navigate('Auth');
  }

  createList = (json) => {
    // list = Object.keys(this.state.posts).map(function(key) { return <Post />; })
    // const numbers = [1,2,3,4,5];
    console.log(json)
    const keys = Object.keys(json)
    const listItems = keys.map((key) => 
      <Post key={key} post={json[key]} />
    );
    this.setState({ list: listItems})
    console.log("this.state.list", this.state.list)
  }

  render() {
    console.log('render')
    const { navigation } = this.props;
    const { posts } = this.state;
    // console.log("this.state.posts[0]", this.state.posts[0]);
    // You need to loop the posts. 
    // if (posts != "") { this.createList() }

    return (
      <React.Fragment>
        {/* posts != "" && Object.keys(posts).map(key => return <Post post={"test"} />; ) ) */}
        {/* posts != "" && ...posts.map(post => console.log("the key is ", post)) */}
        { posts != "" && <Post post={posts[0]} />}
        <View style={styles.container}>
          { this.state.list != "" && this.state.list }
          <Button 
            title="New Picture" 
            onPress={() => navigation.navigate('New')}
            buttonStyle={styles.button}
          />
        </View>
      </React.Fragment>
    );
  }
}