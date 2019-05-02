import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Swiper from 'react-native-swiper';
import Posts from '../components/Posts';

export default class MainScreen extends Component {
  render() {
    return (
      <React.Fragment>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <SafeAreaView>
          <Posts navigation={this.props.navigation} />
        </SafeAreaView>
      </React.Fragment>
    )
  }
}
