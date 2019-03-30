import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'react-native-elements';
import Orientation from 'react-native-orientation-locker';
import { styles } from './PostStyles';
// import Picture from '../lib/picture'
import { createPost } from '../lib/api'
import ClientDate from '../lib/client_date';

export default class PostScreen extends Component {
  constructor(props) {
    super(props)
    this.takePicture = this.takePicture.bind(this)
  }

  componentDidMount() {
    Orientation.lockToLandscapeLeft();
  }

  componentWillUnmount() {
    Orientation.lockToPortrait();
  }

  takePicture = async function() {
    const options = { quality: 0.5, base64: true };
    const picture = await this.camera.takePictureAsync(options);
    const data = new FormData();
    const timestamp = new ClientDate().iso;
    data.append('post[picture][file]', picture.base64);
    data.append('post[picture][name]', `test_${timestamp}.png`);
    data.append('post[picture][type]', 'image/png');
    await createPost(data)
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          captureAudio={false}
          permissionDialogTitle='Permission to use camera'
          permissionDialogMessage='We need your permission to use your camera phone'
        >
          <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center', backgroundColor: 'transparent'}}>
            <TouchableOpacity
              onPress={this.takePicture}
              style={styles.capture}
            >
              <Icon
                containerStyle={styles.buttonAbsolute}
                name='camera' 
                color="#4d79ff"
                reverse
                size={35}
                backgroundColor="transparent"
              />                  
            </TouchableOpacity>
          </View>
        </RNCamera>
      </View>
    );
  }
}
