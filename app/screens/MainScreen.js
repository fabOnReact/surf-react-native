import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import Swiper from 'react-native-swiper';
import Posts from '../components/Posts';
import Navbar from '../components/Navbar';
// import Post from '../components/Post';

export default class MainScreen extends Component {
  render() {
    return (
      <React.Fragment>
        <Swiper
          showsPagination={false} 
          loop={false}
          index={1}
        >
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <View>
            <Text>Map Screen</Text>
          </View>
          <View>
            <Text>Camera Screen</Text>
          </View>
          <View style={{flex: 1}}>
            <Posts />
          </View>
        </Swiper>
        <Navbar />
      </React.Fragment>
    )
  }
}
