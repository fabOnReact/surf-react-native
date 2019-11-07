import React, { Component } from 'react';
import { BackHandler, DeviceEventEmitter, Alert, View, Text, StatusBar, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import DeviceInfo from 'react-native-device-info';
import Spinner from 'react-native-loading-spinner-overlay';
import Locations from '../components/index/Locations';
import LocationPermission from '../components/LocationPermission';

export default class IndexScreen extends Component {
  state = { spinner: true };

  pageIsLoaded = () => { 
    this.setState({ spinner: false }) 
  }

  render() {
    const ios = Platform.OS === 'ios'
    // const has_notch = DeviceInfo.hasNotch()
    return (
      <React.Fragment>
        { ios ? <LocationPermission /> : null } 
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Locations 
          navigation={this.props.navigation} 
          loaded={this.pageIsLoaded} 
          locationAlert={this._alertForLocationPermission} 
        /> 
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
});
