import React, { Component } from 'react'
import { Platform, StyleSheet, View, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Spinner from 'react-native-loading-spinner-overlay';
import Dimensions from 'Dimensions';
import RecordingButton from '../buttons/RecordingButton';
import UploadButton from '../buttons/UploadButton';
import Player from './Player';
import Api from '../../lib/api';
import { getGps } from '../../lib/support';
import ZoomView from './ZoomView';
import SafeArea from '../SafeArea';

const MAX_ZOOM = 7; // iOS only
const ZOOM_F = Platform.OS === 'ios' ? 0.0009 : 0.08;

export default class Recorder extends Component {

  constructor(props) {
    super(props)
    const { credentials } = this.props
    this.state = { latitude: null, longitude: null, recording: false, highlight: false, locations: [], video: "", zoom: 0.0, spinner: true }
    this.api = new Api(credentials)
    this.api.page = 1
    this.api.per_page = 1
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
    return `Looks like you are very far from any surf destination, only videos that are taken at a surfspot present in our database are accepted. Sorry!`
  }

  get params() {
    const { latitude, longitude } = this.state
    return {
      latitude,
      longitude,
      page: 1,
      per_page: 1,
    }
  }

  componentDidMount = async () => {
    const { latitude, longitude } = this.state
    getGps(this._setLatLong)
  }

  componentDidUpdate = async (prevProp, prevState) => {
    const { recording, latitude, longitude, saved } = this.state
    const is_recording = prevState.recording == false && recording
    const latitude_updated = prevState.latitude != latitude
    const longitude_updated = prevState.longitude != longitude
    const position_updated = latitude_updated && longitude_updated
    this.api.params = this.params
    if (is_recording) {
      this.interval = setInterval(() => this.setState({
        highlight: !this.state.highlight
      }), 900)
      const video  = await this.camera.recordAsync(this.options)
      this.setState({ video })
    }
    if (position_updated) { this._setLocations() }
    if(saved) {
      this.setState({ saved: false })
      alert("Your videos was saved and it is now available in the homepage")
    } 
  }

  _setLocations = async () => {
    var response = await this.api.getLocationsNearby()
    const locations = await response.json()
    this.setState({ locations })
    this.pageIsLoaded()
  }

  _setLatLong = ({ latitude, longitude }) => {
    this.setState({ latitude, longitude })
  }

  _setVideo = (saved) => {
    this.setState({ video: null, saved: saved })
  }

  pageIsLoaded = () => { 
    this.setState({ spinner: false }) 
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
    const { recording, locations } = this.state
    const surfspots_found = locations.length > 0
    if (!surfspots_found) { 
      alert(this.message) 
      return
    }
    recording ? this._stopRecording() : this._startRecording()
  }

  _onPinchStart = () => {
    this._prevPinch = 1
  }

  _onPinchEnd = () => {
    this._prevPinch = 1
  }

  _onPinchProgress = (p) => {
    let p2 = p - this._prevPinch
    if(p2 > 0 && p2 > ZOOM_F) {
      this._prevPinch = p
      this.setState({zoom: Math.min(this.state.zoom + ZOOM_F, 1)})
    }
    else if (p2 < 0 && p2 < -ZOOM_F) {
      this._prevPinch = p
      this.setState({zoom: Math.max(this.state.zoom - ZOOM_F, 0)})
    }
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
        zoom={this.state.zoom}
        maxZoom={MAX_ZOOM}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        <ZoomView 
          onPinchEnd={this._onPinchEnd}
          onPinchStart={this._onPinchStart}
          onPinchProgress={this._onPinchProgress}>
          <SafeArea>
            <RecordingButton 
              recording={this._recording}
              highlight={highlight}
            />
          </SafeArea>
        </ZoomView>
      </RNCamera>
    )
  }

  render() {
    const { credentials } = this.props
    const { video, longitude, latitude } = this.state
    return (
      <React.Fragment>
        <Spinner
          visible={this.state.spinner}
          textContent={'Verifing your position on the Beach'}
          textStyle={styles.spinnerTextStyle}
        />
        { video ?  
        <Player 
          longitude={longitude} 
          latitude={latitude} 
          video={video} 
          setVideo={this._setVideo}
          credentials={credentials}
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
  spinnerTextStyle: {
    color: 'white'
  },
});
