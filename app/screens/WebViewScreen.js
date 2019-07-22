import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { host } from '../config/constants';

export default class WebViewScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', ''),
    };
  };

  render() {
    const { navigation } = this.props
    const path = navigation.getParam('path', '')
    const url = host + path
    return (
      <WebView source={{uri: url}} />
    );
  }
}
