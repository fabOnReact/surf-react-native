import React, { Component }  from 'react';
import { Platform, StatusBar, ActivityIndicator, View, StyleSheet, TouchableOpacity, Button, Text } from 'react-native';
import { Card } from 'native-base';
import DeviceInfo from 'react-native-device-info';
import Video from 'react-native-video';
import Dimensions from 'Dimensions';
import { Header, SafeAreaView } from 'react-navigation';
import CamButton from '../buttons/CamButton';
import Location from './Location';
import { element } from '../../lib/support';

export default class Cameras extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true, height: Dimensions.get('window').height }
  }

  componentWillMount() { 
    const { location: { included: cameras }} = this.props
    this.setState({ camera: cameras[0] })
  }

  setHeight = () => {
    const new_height = Dimensions.get('window').height
    this.setState({ height: new_height })
  }

  changeCamera = (key) => {
    const { location: { included: cameras }} = this.props
    this.setState({ camera: cameras[key] })
  }

  renderText = () => {
    const { loading } = this.state
    const { location, navigation } = this.props
    const { included: cameras } = location
    return ( 
      <React.Fragment>
        <View style={styles.loading}>
          <ActivityIndicator 
            size="large" 
            color="white"
            animating={loading}
          />
        </View>
        <Location 
          location={location}
          cameras={cameras} 
          changeCamera={this.changeCamera}
          navigation={navigation}
        />
      </React.Fragment>
    )
  }

  renderSafeArea = () => {
    return (
      <SafeAreaView style={styles.safe_area}> 
        { this.renderText() }
      </SafeAreaView>
    )
  }
  
  render() {
    // const location_attributes = location.data.attributes
    const { camera: { attributes: { posts }} } = this.state
    const { video: { url, poster }} = posts[0]
    const has_notch = DeviceInfo.hasNotch()
    return (
      <View style={styles.container}>
        <Video 
          source={{ uri: url }}
          poster={poster}
          posterResizeMode="cover"
          resizeMode="cover"
          style={[styles.video]} //, {height: this.state.height}]}
          onLoadStart={() => this.setState({loading: true })}
          onReadyForDisplay={() => this.setState({loading: false})}
          repeat 
          muted 
        />
        { has_notch ? this.renderSafeArea() : this.renderText() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    zIndex: 0, 
    height: Dimensions.get('screen').height,
    marginBottom: 10,
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
    height: Dimensions.get('screen').height,
    zIndex: 0,
    marginLeft: 0,
  },
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
