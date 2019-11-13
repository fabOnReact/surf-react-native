import React, { Component }  from 'react';
import { ActivityIndicator, Platform, StatusBar, View, StyleSheet, TouchableOpacity, Button, Text } from 'react-native';
import { Card } from 'native-base';
import DeviceInfo from 'react-native-device-info';
import Video from 'react-native-video';
import Dimensions from 'Dimensions';
import Orientation from 'react-native-orientation-locker';
import { Header, SafeAreaView } from 'react-navigation';
import CamButton from '../buttons/CamButton';
import Location from './Location';

export default class Cameras extends Component {
  constructor(props) {
    super(props)
    this.state = { spinner: false, height: Dimensions.get('window').height, cameraIndex: 0, postIndex: 0 }
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

  componentWillMount() { 
    if (this.props.location == undefined) { console.error(this.props.location) }
    const { location: { included: cameras }} = this.props
    this.setState({ camera: cameras[0] })
  }

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
    const has_notch = DeviceInfo.hasNotch()
    const screen = Dimensions.get('screen').height
    return (
      <View style={[
        styles.container,
        { height: screen }
      ]}>
        <Video 
          source={{ uri: url }}
          poster={poster}
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
              color="white"
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
