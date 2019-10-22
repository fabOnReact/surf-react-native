import React, { Component }  from 'react';
import { Platform, StatusBar, ActivityIndicator, View, StyleSheet, TouchableOpacity, Button, Text } from 'react-native';
import { Card } from 'native-base';
import Video from 'react-native-video';
import Dimensions from 'Dimensions';
import Orientation from 'react-native-orientation';
import { Header } from 'react-navigation';
import CamButton from '../buttons/CamButton';
import Location from './Location';
import { element } from '../../lib/support';

export default class Cameras extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true }
  }

  componentWillMount() { 
    Orientation.addOrientationListener(this._imageStyles) 
    const { location: { included: cameras }} = this.props
    this.setState({ camera: cameras[0] })
  }

  componentDidMount() { 
    // this._imageStyles("PORTRAIT") 
  }

  componentWillUnmount() { 
    Orientation.removeOrientationListener(this._imageStyles) 
  }

  get width() {
    return Dimensions.get('window').width
  }

  get height() {
    return Dimensions.get('window').height
  }

  // _imageStyles = (orientation) => {
  //   element.style(orientation, this)
  // }

  get style() {
    const { height, width, portrait } = this.state
    const style = { flex: 2, borderRadius: 9, width: null, height:null }
    switch(portrait) {
      case true:
        return { ...style, height: height };
        break;
      case false:
        return { ...style, height: width };
        break;
      default:
        // console.log("impossible to choose correct style")
    }
  }

  _imageStyles = (orientation) => {
    const new_width = this.width - Header.HEIGHT/2
    if (orientation != 'PORTRAIT') { 
      this.setState({ width: new_width, portrait: false })
    } else { 
      const new_height = (this.height - Header.HEIGHT)/3
      this.setState({ width: new_width, height: new_height, portrait: true })
    }
  }

  changeCamera = (key) => {
    const { location: { included: cameras }} = this.props
    this.setState({ camera: cameras[key] })
  }

  render() {
    const { location, forecastScreen, navigation } = this.props
    const { included: cameras } = location
    // const location_attributes = location.data.attributes
    const { camera: { attributes: { posts }} } = this.state
    const { loading } = this.state
    const { video: { url, poster }} = posts[0]
    return (
        <View style={{flex: 1, zIndex: 0}}>
          <Video 
            source={{ uri: url }}
            poster={poster}
            posterResizeMode="cover"
            resizeMode="cover"
            style={styles.video}
            onLoadStart={() => this.setState({loading: true })}
            onReadyForDisplay={() => this.setState({loading: false})}
            repeat 
            muted 
          />
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
        </View>
    )
  }
}

const styles = StyleSheet.create({
  video: { 
    // borderRadius: 9, 
    // aspectRatio: 1.7, 
    width: "100%",
    // height: "100%",
    height: Dimensions.get('window').height,
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
