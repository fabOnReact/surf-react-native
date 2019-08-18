import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StatusBar, ImageBackground } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'react-native-elements';
import Orientation from 'react-native-orientation-locker';
import { styles } from './styles/CameraStyles';
import Location from '../components/Location';
import { buttons } from '../components/styles/ButtonStyles';
import { createPost } from '../lib/api';
import { errorMessage  } from '../lib/support';
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
    this.state = { latitude: null, longitude: null }
  }

  _setLocation = function() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ 
          latitude: position.coords.latitude, 
          longitude: position.coords.longitude, 
        });
      },
      (error) => errorMessage(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
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
    await createPost(data)
  };

  render() {
    return (
      <ImageBackground 
        source={require('../images/bondi.jpg')}
        style={{width: "100%", height: "100%"}}>
        <View style={styles.container}>
            {/*<RNCamera
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
            }}>*/}
            <Icon
              containerStyle={buttons.buttonAbsolute}
              name='ios-radio-button-off'
              type='ionicon'
              size={80}
              color='#ffffff'
              underlayColor='transparent'
              onPress={this._takePicture}
            />
          {/*</RNCamera>*/}
        </View>
      </ImageBackground>
    );
  }
}
