import React, { Component }  from 'react';
import { Dimensions, ActivityIndicator, Platform, StatusBar, View, StyleSheet, TouchableOpacity, Button, Text } from 'react-native';
import { Card } from 'native-base';
import DeviceInfo from 'react-native-device-info';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import { Header, SafeAreaView } from 'react-navigation';
import CamButton from '../buttons/CamButton';
import Location from './Location';

export default class Cameras extends Component {
  constructor(props) {
    super(props)
    const { location: { included: cameras }} = this.props
    this.state = { spinner: false, height: Dimensions.get('window').height, cameraIndex: 0, postIndex: 0, camera: cameras[0] }
  }

  _onOrientationDidChange = (orientation) => {
    if (['PORTRAIT','PORTRAIT-UPSIDEDOWN'].includes(orientation)) {
      const height = Dimensions.get('window').height
      const screen_height = Dimensions.get('screen').height
      this.setState({ height, screen_height })
    } else {
      const height = Dimensions.get('window').height
      const screen_height = Dimensions.get('screen').height
      this.setState({ height, screen_height })
    }
  };

  componentDidMount() {
    Orientation.addOrientationListener(this._onOrientationDidChange);
  }

  componentWillUnmount = () => {
    Orientation.removeOrientationListener(this._onOrientationDidChange);
  }

  setHeight = () => {
    const new_height = Dimensions.get('window').height
    this.setState({ height: new_height })
  }

  changeCameraIndex = (key) => {
    const { location: { included: cameras }} = this.props
    this.setState({ camera: cameras[key], cameraIndex: key, postIndex: 0 })
  }

  changePostIndex = (key) => {
    this.setState({ postIndex : key })
  }


  renderSafeArea = () => {
    return (
      <SafeAreaView style={styles.safe_area}> 
        { this.renderText() }
      </SafeAreaView>
    )
  }
  renderText = () => {
    const { locations, location, navigation, imperial, credentials } = this.props
    const { cameraIndex, postIndex } = this.state
    const { included: cameras } = location
    const new_props = { 
      locations, location, cameras, 
      cameraIndex, postIndex, 
      imperial, navigation, credentials
    }
    return ( 
      <React.Fragment>
        <Location 
          changePostIndex={this.changePostIndex}
          changeCamera={this.changeCameraIndex}
          { ...new_props }
        />
      </React.Fragment>
    )
  }

  render() {
    const { height, screen_height, postIndex, spinner } = this.state
    const { camera: { attributes: { posts }}} = this.state
    const { video: { url, poster }} = posts[postIndex]
    const screen = Dimensions.get('screen').height
    const screen_width = Dimensions.get('screen').width
    const poster_array = poster.split("upload/")
    const video_array = url.split("upload/")
    const ios = Platform.OS == 'ios'
    const image_format = ios ? "fl_lossy" : "f_webp"
    const ios_format = `f_mp4,vc_h265,w_${screen_width}`
    const android_format = `vc_auto,w_${screen_width}` 
    const video_format = ios ? ios_format : android_format
    const image_resolution = `${image_format},q_auto,w_${screen_width},dpr_1.0,c_limit`
    const poster_mobile = `${poster_array[0]}upload/${image_resolution}/${poster_array[1]}`
    const video_mobile = `${video_array[0]}upload/${video_format},c_limit/${video_array[1]}`
    const has_notch = DeviceInfo.hasNotch()
    return (
      <View style={[
        styles.container,
        { height: screen }
      ]}>
        <Video 
          source={{ uri: video_mobile}}
          poster={poster_mobile}
          posterResizeMode="cover"
          resizeMode="cover"
          style={[styles.video, {height: screen}]} 
          onLoadStart={() => this.setState({spinner: true })}
          onReadyForDisplay={() => this.setState({spinner: false})}
          repeat 
          muted 
          hideShutterView={true}
        />
        {
          spinner && <View style={[styles.indicator]}>
            <ActivityIndicator 
              size="large"
              animating={true}
              color="black"
            />
          </View>
        }
        { has_notch ? this.renderSafeArea() : this.renderText() }
      </View>
    )
  }
}

const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    zIndex: 0, 
    marginBottom: 0,
    borderBottomWidth:.5,
    borderBottomColor:'#f2f2f2',
  },
  safe_area: {
    flex: 1,
    position: 'absolute',
    top: Header.HEIGHT,
    left: 0,
    right: 0,
    bottom: 0,
  },
  video: { 
    zIndex: 0,
    marginLeft: 0,
  },
  indicator: {
    position: 'absolute',
    top: height / 2 - 15,
    left: width / 2 - 15,
    zIndex: 5,
  }
})
