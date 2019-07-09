import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { host } from '../config/constants';

export default class MapScreen extends Component {
  render() {
    const { navigation } = this.props
    const path = navigation.getParam('path', '')
    const url = host + path
    return (
      <WebView source={{uri: url}} />
    );
  }
}
