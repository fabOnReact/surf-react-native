import React, { Component } from 'react';
import { TouchableOpacity, Text, View, ScrollView, AsyncStorage } from 'react-native';
import { styles } from './PostStyles';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'react-native-elements';
import { host } from '../config/constants'
import Orientation from 'react-native-orientation-locker';
// import Picture from '../lib/picture'
import Post from '../lib/api'
import { createPost, getData, getPostParams } from '../lib/api'
import ClientDate from '../lib/client_date';

export default class PostScreen extends Component {

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
    const credentials = { 
      userToken: await AsyncStorage.getItem('userToken'),
      userEmail: await AsyncStorage.getItem('userEmail'),
    }
    const data = new FormData();
    const timestamp = new ClientDate().iso;
    console.log(timestamp);
    data.append('post[picture][file]', Picture);
    data.append('post[picture][name]', `test_${timestamp}.png`);
    data.append('post[picture][type]', 'image/png');
    // const headers = { 'Accept': " application/json", 'Content-Type': "multipart/form-data; boundary=--------------------------329710892316545763789878", 'X-User-Email': userEmail, 'X-User-Token': userToken, 'accept-encoding': "gzip, deflate"}
    // const config = { method: 'POST', headers: headers, body: data };
    // const config = { method: 'POST', body: data };
    // await createPost(config, credentials)
    await createPost(data, credentials)
    // const response = await fetch(host + "/posts.json", config)
  }


  //  takePicture = async () => {
  //    const options = { quality: 0.5, base64: true };
  //    const picture = await this.camera.takePictureAsync(options);
  //    const userEmail = await AsyncStorage.getItem('userEmail')
  //    const userToken = await AsyncStorage.getItem('userToken')
  //    const credentials = {
  //      userEmail: userEmail,
  //      userToken: userToken,
  //    }
  //    // const credentials = {
  //    //   "X-User-Email": userEmail, 
  //    //   "X-User-Token": userToken, 
  //    // }
  //    // const credentials = {
  //    //   userEmail: await AsyncStorage.getItem('userEmail'),
  //    //   userToken: await AsyncStorage.getItem('userToken'),
  //    // }
  //    createPost(picture, credentials)
  //    // params = getPostParams(picture)
  //    // createPost(params)
  //  };

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
            captureAudio={false}
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
