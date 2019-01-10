// import React from 'react';
// import { AppRegistry } from 'react-native';
/*
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import AuthLoadingScreen from './screens/AuthLoadingScreen';
import IndexScreen from './screens/IndexScreen';
import NewScreen from './screens/NewScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';


const AppStack = createStackNavigator({ New: NewScreen }); //Index: IndexScreen, 
const AuthStack = createStackNavigator({ SignUp: SignUpScreen, SignIn: SignInScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
*/

/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
import React, { Component } from 'react';
import { AppRegistry, TouchableOpacity, Text, View, ScrollView } from 'react-native';
// import { Input, Button } from 'react-native-elements';
import { styles } from './screens/NewStyles';
import { RNCamera } from 'react-native-camera';
import {name as appName} from './app.json';

export default class App extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            onGoogleVisionBarcodesDetected={({ barcodes }) => {
              console.log(barcodes)
            }}
        />
          <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
          <TouchableOpacity
              onPress={this.takePicture.bind(this)}
              style = {styles.capture}
          >
              <Text style={{fontSize: 14}}> SNAP </Text>
          </TouchableOpacity>
        </View>      
      </View>
    );
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)
      console.log(data.uri);
    }
  };
}

AppRegistry.registerComponent(appName, () => App);