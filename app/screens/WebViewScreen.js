import React, { Component } from 'react';
import StatusBar from '@react-native-community/status-bar'
import { WebView } from 'react-native-webview';
import { host } from '../config/constants';

export default class WebViewScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', ''),
      headerTintColor: 'black' ,
      // headerStyle: { marginTop: StatusBar.currentHeight },
    }
  }

  render() {
    const { navigation } = this.props
    const path = navigation.getParam('path', '')
    const url = 'https://surfcheck.xyz' + path
    return (
      <React.Fragment>
        <StatusBar 
          backgroundColor="black" 
          hidden={false} 
          barStyle="dark-content" 
          translucent={false} />
        <WebView source={{uri: url}} />
      </React.Fragment>
    );
  }
}
