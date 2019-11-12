import React, { Component } from 'react';
import { Dimensions, BackHandler, DeviceEventEmitter, Alert, View, Text, StatusBar, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Locations from '../components/index/Locations';
import LocationPermission from '../components/LocationPermission';
import { getAsset } from '../lib/support'

export default class IndexScreen extends Component {
  state = { spinner: true, credentials: null };

  constructor(props) {
    super(props)
    this.setCredentials()
  }

  pageIsLoaded = () => { 
    this.setState({ spinner: false }) 
  }

  pageLoading = () => {
    this.setState({ spinner: true })
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
    const { credentials, spinner } = this.state
    const credentials_found = !!credentials
    const ios = Platform.OS === 'ios'
    const height = Dimensions.get("window").height;
    return (
      <React.Fragment>
        { ios ? <LocationPermission /> : null } 
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        {
          spinner && <Video 
            source={getAsset("costline-max.mp4")}
            poster={getAsset("costline-poster-max.png")}
            posterResizeMode={"cover"}
            resizeMode={"cover"}
            style={{height: height}}
            repeat 
            muted
          />
        }
        <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
          color="white"
        /> 
        { 
          credentials_found && <Locations 
            navigation={this.props.navigation} 
            loaded={this.pageIsLoaded} 
            locationAlert={this._alertForLocationPermission} 
            credentials={credentials}
            loading={this.pageLoading}
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
