import React, { Component } from 'react';
import { BackHandler, DeviceEventEmitter, Alert, View, Text, StatusBar, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Locations from '../components/index/Locations';
import LocationPermission from '../components/LocationPermission';

export default class IndexScreen extends Component {
  state = { spinner: true, credentials: null };

  constructor(props) {
    super(props)
    this.setCredentials()
  }

  pageIsLoaded = () => { 
    this.setState({ spinner: false }) 
  }

  setCredentials = async () => {
    const email = await AsyncStorage.getItem('userEmail')
    const token = await AsyncStorage.getItem('userToken')
    const credentials = { 
      'X-User-Email': email,
      'X-User-Token': token,
    } 
    this.setState({ credentials })
  }

  render() {
    const { credentials } = this.state
    const credentials_found = !!credentials
    const ios = Platform.OS === 'ios'
    return (
      <React.Fragment>
        { ios ? <LocationPermission /> : null } 
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
          color="black"
        />
        { 
          credentials_found && <Locations 
            navigation={this.props.navigation} 
            loaded={this.pageIsLoaded} 
            locationAlert={this._alertForLocationPermission} 
            credentials={credentials}
          /> 
        }
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
});
