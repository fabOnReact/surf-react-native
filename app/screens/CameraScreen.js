import React, { Component } from 'react';
import { Alert, StyleSheet, TouchableOpacity, TouchableHighlight, View, Text, StatusBar, ImageBackground } from 'react-native';
import Dimensions from 'Dimensions';
import { RNCamera } from 'react-native-camera';
import Geolocation from 'react-native-geolocation-service';
import Spinner from 'react-native-loading-spinner-overlay';
import { Icon } from 'react-native-elements';
import ErrorMessage from '../components/ErrorMessage'
import Orientation from 'react-native-orientation-locker';
import Location from '../components/Location';
import { buttons } from '../components/styles/ButtonStyles';
import { createPost } from '../lib/api';
import { errorMessage, postSettings } from '../lib/support';
import ClientDate from '../lib/client_date';

export default class CameraScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'rgba(0,0,0,0.0)',
    },
    headerTintColor: 'white',
    headerTransparent: true,
  };

  constructor(props) {
    super(props)
    this._takePicture = this._takePicture.bind(this)
    this._setLocation()
    this.state = { latitude: null, longitude: null, spinner: false }
  }

  _setLocation = function() {
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({ 
          latitude: position.coords.latitude, 
          longitude: position.coords.longitude, 
        });
      },
      (error) => { 
        // console.warn(error)
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  pageLoaded = () => {
    this.setState({ spinner: false })
  }

  success = (json, status) => {
    if (status == postSettings.responseStatus) { this.pageLoaded() }
    else { 
      Alert.alert(
        'Sorry! Picture was not saved!',
        json["location"][1],
        [
          {text: 'OK', onPress: () => this.pageLoaded() },
        ],
        {cancelable: false},
      );
    }
  }

  _takePicture = async function() {
    const { latitude, longitude } = this.state;
    const options = { quality: 0.5, base64: true, forceUpOrientation: true, fixOrientation: true };
    const picture = await this.camera.takePictureAsync(options);
    const data = new FormData();
    const timestamp = new ClientDate().iso;
    data.append('post[picture][file]', picture.base64);
    data.append('post[picture][name]', `${timestamp}.png`);
    data.append('post[picture][type]', 'image/png');
    data.append('post[latitude]', latitude);
    data.append('post[longitude]', longitude);
    this.setState({ spinner: true })
    await createPost(this.success, data, postSettings)
  };

  render() {
    const { errors, spinner } = this.state
    return (
      <View style={styles.container}>
        { errors ? <ErrorMessage styles={{marginTop: 100}} message={errors} /> : null }
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}>
            <Spinner
              visible={spinner}
              textContent={'Saving picture...'}
              textStyle={styles.spinnerTextStyle}
            />
            <Icon
              containerStyle={[buttons.buttonAbsolute, {borderRadius: 10}]}
              name='ios-radio-button-on'
              type='ionicon'
              size={80}
              color='#ffffff'
              underlayColor='transparent'
              onPress={this._takePicture}
            />
        </RNCamera>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  preview: {
    height: Dimensions.get('window').height,
    width: "100%",
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: 'transparent',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
});
