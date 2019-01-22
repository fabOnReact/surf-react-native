import React, { Component } from 'react';
import { TouchableOpacity, Text, View, ScrollView, AsyncStorage } from 'react-native';
import { styles } from './NewStyles';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'react-native-elements';
import { host } from '../config/constants'
import Orientation from 'react-native-orientation-locker';
import ClientDate from '../lib/client_date'

export default class NewScreen extends Component {

  componentDidMount() {
    Orientation.lockToLandscapeLeft();
  }

  componentWillUnmount() {
    Orientation.lockToPortrait();
  }

  takePicture = async function() {
    const options = { quality: 0.5, base64: true };
    const picture = await this.camera.takePictureAsync(options);
    Picture = picture.base64
    this.storePicture()
  };

  storePicture = async function() {
    const userToken = await AsyncStorage.getItem('userToken');
    const userEmail = await AsyncStorage.getItem('userEmail'); 
    const data = new FormData();
    const timestamp = new ClientDate().iso;
    console.log(timestamp);
    data.append('post[picture][file]', Picture);
    data.append('post[picture][name]', `test_${timestamp}.png`); 
    data.append('post[picture][type]', 'image/png');
    const headers = { 'Accept': " application/json", 'Content-Type': "multipart/form-data; boundary=--------------------------329710892316545763789878", 'X-User-Email': userEmail, 'X-User-Token': userToken, 'accept-encoding': "gzip, deflate"}
    const config = { method: 'POST', headers: headers, body: data }; 
    const response = await fetch(host + "/posts.json", config)
    console.log(response)
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}> 
            <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center', backgroundColor: 'transparent'}}>
              <TouchableOpacity
                onPress={this.takePicture.bind(this)}
                style = {styles.capture}>
                <Icon
                  containerStyle={styles.buttonAbsolute}
                  name='camera' 
                  color="#4d79ff"
                  reverse={true}
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
