import React, { Component } from 'react';
import { Text } from 'react-native';
import { AppContainer } from './Navigation';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return <AppContainer />; 
  }
}

//AppRegistry.registerComponent(appName, () => App);

/*
import React, { Component } from 'react';
import { AppRegistry, TouchableOpacity, Text, View, ScrollView } from 'react-native';
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
      console.log(this.camera);
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)
      console.log(data.uri);
    }
  };
}

AppRegistry.registerComponent(appName, () => App);
*/