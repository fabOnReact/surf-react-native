import React, { Component } from 'react';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { styles } from './NewStyles';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'react-native-elements';

export default class NewScreen extends Component {
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
            }}> 
            <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center', backgroundColor: 'transparent'}}>
              <TouchableOpacity
                onPress={this.takePicture.bind(this)}
                style = {styles.capture}>
                <Icon
                  containerStyle={styles.buttonAbsolute}
                  name='camera' 
                  color="blue"
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

  takePicture = async function() {
    if (this.camera) {
      console.log(this.camera);
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)
      console.log(data.uri);
    }
  };
}