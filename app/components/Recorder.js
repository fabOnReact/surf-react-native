import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Dimensions from 'Dimensions';
import RecordingButton from './RecordingButton';
import Player from './Player';
import Api from '../lib/api';
import { getGps } from '../lib/support';

export default class Recorder extends Component {
  constructor(props) {
    super(props)
    this.state = { latitude: null, longitude: null, recording: false, highlight: false, locations: [] }
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

  get message() {
    return `Looks like you are very far from any surf destination, 
            only videos that are taken at a surfspot present 
            in our database are accepted. Sorry!`
  }

  componentDidMount = async () => {
    const { latitude, longitude } = this.state
    getGps(this._setLocation)
    this.api = new Api()
    var response = await this.api.getLocations(latitude, longitude)
    var location = await response.json()[0]
    this.setState({ location })
  }

  componentDidUpdate = async (prevProp, prevState) => {
    const { recording } = this.state
    const is_recording = prevState.recording == false && recording
    if (is_recording) {
      this.interval = setInterval(() => this.setState({
        highlight: !this.state.highlight
      }), 900)
      const video  = await this.camera.recordAsync(this.options)
      this.setState({ video })
    }
  }

  _setLocation = ({ latitude, longitude }) => {
    this.setState({ latitude, longitude })
  }

  _startRecording = async function() {
    const { recording } = this.state;
    this.setState({ recording: !recording });
  }

  _stopRecording = async () => {
    clearInterval(this.interval) 
    this.setState({ highlight: false, recording: false })
    this.camera.stopRecording()
  }

  _recording = () => {
    const { recording, location } = this.state
    if (!!location) { 
      alert(this.message) 
      return
    }
    recording ? this._stopRecording() : this._startRecording()
  }

  _renderCamera() {
    const { highlight } = this.state
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
          <RecordingButton 
            recording={this._recording}
            highlight={highlight}
          />
      </RNCamera>
    )
  }

  render() {
    const { video, longitude, latitude } = this.state
    return (
      <React.Fragment>
        { video ?  
          <Player 
            longitude={longitude} 
            latitude={latitude} 
            video={video} 
            api={this.api}
            /> 
          : this._renderCamera() 
        }
      </React.Fragment>
    )
  }
}

export const styles = StyleSheet.create({
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
});
