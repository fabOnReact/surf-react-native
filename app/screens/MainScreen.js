import React, { Component } from 'react';
import { View, Text, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Swiper from 'react-native-swiper';
import Posts from '../components/Posts';

export default class MainScreen extends Component {
  iosPosts() {
    return ( 
      <SafeAreaView>
        <Posts navigation={this.props.navigation} />
      </SafeAreaView>
    )
  }

  render() {
    return (
      <React.Fragment>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        { Platform.OS === 'ios' ? this.iosPosts() : <Posts navigation={this.props.navigation} /> }
      </React.Fragment>
    )
  }
}
