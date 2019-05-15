import React, { Component } from 'react';
import { View, Text, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Swiper from 'react-native-swiper';
import Posts from '../components/Posts';

export default class MainScreen extends Component {
  iosPosts() {
    return ( 
      <SafeAreaView style={{flex:1}}>
        <Posts navigation={this.props.navigation} />
      </SafeAreaView>
    )
  }

  render() {
    const ios10 = Platform.OS === 'ios'
    return (
      <React.Fragment>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        { ios10 ? this.iosPosts() : <Posts navigation={this.props.navigation} /> } 
      </React.Fragment>
    )
  }
}
