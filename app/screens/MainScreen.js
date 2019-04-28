import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import Swiper from 'react-native-swiper';
import Posts from '../components/Posts';

export default class MainScreen extends Component {
  render() {
    return (
      <React.Fragment>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Posts navigation={this.props.navigation} />
      </React.Fragment>
    )
  }
}
