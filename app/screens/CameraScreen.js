import React, { Component } from 'react';
import { Alert, StyleSheet, TouchableOpacity, TouchableHighlight, View, Text, StatusBar, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Dimensions from 'Dimensions';
import { RNCamera } from 'react-native-camera';
import Geolocation from 'react-native-geolocation-service';
import { Icon } from 'react-native-elements';
import ErrorMessage from '../components/ErrorMessage'
import Orientation from 'react-native-orientation-locker';
import Location from '../components/Location';
import { buttons } from '../components/styles/ButtonStyles';
import { createPost, uploadVideo, getLocations } from '../lib/api';
import Api from '../lib/api';
import Tutor from '../components/Tutor';
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
    this._setLocation()
    this.state = { latitude: null, longitude: null, recording: false, processing: false, highlight: false, processing: false, locations: [], url: null, poster: null, tutor: true }
  }

  componentDidMount() {
    this._checkLocation()
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

  get options() {
    return {
        quality: 0.5,
        fixOrientation: true,
        forceUpOrientation: true,
        videoOrientation: 1,
        deviceOrientation: 1,
        mute: true,
        mirrorVideo: false,
        maxDuration: 300,
      }
  }

  get post() {
    const { latitude, longitude, url = "", poster = "" } = this.state
    return JSON.stringify({ 
      post: { 
        latitude, 
        longitude, 
        video: { url, poster }
      }
    })
  }

  _checkLocation = async () => {
    const { latitude, longitude } = this.state
    this._api = new Api()
    var response = await this._api.getLocations(latitude, longitude)
    var location = await response.json()[0]
    this.setState({ location })
  }

  _startRecording = async function() {
    const { recording, highlight } = this.state;
    this.setState({ recording: !recording });
  }

  componentDidUpdate = async (prevProp, prevState) => {
    const { recording, processing } = this.state
    const is_recording = prevState.recording == false && recording
    const is_processing = prevState.processing == false && processing
    const processing_finished = prevState.processing == true && !processing
    if (is_recording) {
      this.interval = setInterval(() => this.setState({
        highlight: !this.state.highlight
      }), 900)
      this._video  = await this.camera.recordAsync(this.options)
      this.setState({ processing: true })
    }
    if (is_processing) {
      var response = await uploadVideo(this.data)
      var json = await response.json()
      const { secure_url, format } = json
      const url = secure_url.replace(format, "mp4")
      const poster = secure_url.replace(format, "png")
      this.setState({ processing: false, url, poster })
    }
    if (processing_finished) {
      this._api.createPost(this.post)
      this.setState({ url: null, poster: null, post: null })
    }
  }

  get data() {
    const { uri, codec = "mp4" } = this._video
    const type = `video/${codec}`
    const data = new FormData()
    data.append("file", { 
      name: 'my_video', 
      uri,
      type
    })
    data.append("upload_preset", "azmsaq1v")
    return data
  }

  get message() {
    return `Looks like you are very far from any surf destination, 
            only videos that are taken at a surfspot present 
            in our database are accepted. Sorry!`
  }

  _recording = () => {
    const { recording, location } = this.state
    if (!!location) { 
      alert(this.message) 
      return
    }
    recording ? this._stopRecording() : this._startRecording()
  }

  _stopRecording = async () => {
    clearInterval(this.interval) 
    this.setState({ highlight: false, recording: false })
    this.camera.stopRecording()
  }

  hideTutor = () => {
    AsyncStorage.setItem('tutor', "false")
    this.setState({ tutor: false })
  }

  _renderCamera() {
    const { recording, highlight, processing } = this.state
    return (
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
          <Icon
            containerStyle={[buttons.buttonAbsolute, {borderRadius: 10}]}
            name='ios-radio-button-on'
            type='ionicon'
            size={80}
            color={ highlight ? 'red' : '#ffffff' }
            underlayColor='transparent'
            disabled={processing}
            disabledStyle={{backgroundColor: "transparent"}}
            onPress={this._recording}
          />
      </RNCamera>
    )
  }

  render() {
    const { errors, tutor, processing } = this.state
    return (
      <View style={styles.container}>
        <Spinner
          visible={processing}
          textContent={'Uploading...'}
          textStyle={styles.spinnerTextStyle}
        />
        { errors ? <ErrorMessage styles={{marginTop: 100}} message={errors} /> : null }
        { tutor ? <Tutor hide={this.hideTutor} /> : this._renderCamera() }
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
