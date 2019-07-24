import React, { Component } from 'react';
import { BackHandler, DeviceEventEmitter, View, Text, StatusBar, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import Swiper from 'react-native-swiper';
import Posts from '../components/Posts';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

LocationServicesDialogBox.checkLocationServicesIsEnabled({
    message: "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
    ok: "YES",
    cancel: "NO",
    enableHighAccuracy: true, 
    showDialog: true, 
    openLocationServices: true, 
    preventOutSideTouch: false, 
    preventBackClick: false, 
    providerListener: false 
}).then(function(success) {
    console.warn(success); 
}).catch((error) => {
    console.warn(error.message); 
});

DeviceEventEmitter.addListener('locationProviderStatusChange', function(status) { 
    console.warn(status); 
});

export default class MainScreen extends Component {
  state = { spinner: true };

  componentWillUnmount() {
      LocationServicesDialogBox.stopListener(); 
  }

  pageIsLoaded = () => { 
    this.setState({ spinner: false }) 
  }

  _iosPosts() {
    return ( 
      <SafeAreaView style={{flex:1}}>
        <Posts navigation={this.props.navigation} loaded={this.pageIsLoaded} />
      </SafeAreaView>
    )
  }

  render() {
    const ios10 = Platform.OS === 'ios'
    return (
      <React.Fragment>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        { ios10 ? this._iosPosts() : <Posts navigation={this.props.navigation} loaded={this.pageIsLoaded} /> } 
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
