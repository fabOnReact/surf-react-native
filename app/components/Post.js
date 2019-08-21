import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Body, Right, View } from 'native-base';
import { Header } from 'react-navigation';
import Video from 'react-native-video';
import Dimensions from 'Dimensions';
import Orientation from 'react-native-orientation';
import { updatePost } from '../lib/api' 
import { host } from '../config/constants';
import { errorMessage, isPresent } from '../lib/support';
import { styles } from  './styles/PostStyles';

export default class Post extends Component {
  constructor(props) {
    super(props)
    this.state = { liked: null, style: '', portrait: null }
  }

  componentWillMount() { Orientation.addOrientationListener(this._imageStyles) } 
  componentWillUnmount() { Orientation.removeOrientationListener(this._imageStyles) }
  componentDidMount() { this._imageStyles("PORTRAIT") }

  _imageStyles = (orientation) => {
    if (orientation != 'PORTRAIT') { 
      const new_width = Dimensions.get('window').width - Header.HEIGHT/2
      this.setState({ width: new_width, portrait: false })
    } else { 
      const new_height = Dimensions.get('window').height - Header.HEIGHT
      this.setState({ height: new_height, portrait: true })
    }
  }

  get style() { 
    const { height, width, portrait } = this.state
    const style = { flex: 2, borderRadius: 9, width: null, height:null }
    switch(portrait) {
      case true:
        return { ...style, height: height/3 }
        break
      case false:
        return { ...style, height: width }
        break
      default:
        // console.log("impossible to choose correct style")
    }
  }

  _renderInfo() {
    const { location } = this.props.post
    const { waveHeight } = location.forecast.hourly
    if (waveHeight) { return `${waveHeight} mt. at ${location.name}` }
    else return location.name
  }

  render() {
    const { liked } = this.state
    const { navigation, post, index } = this.props
    const { location } = post
    const { forecast } = location
    return (
      <React.Fragment>
        <TouchableOpacity 
          onPress={() => { 
            if (isPresent(forecast)) { navigation.navigate('Forecast', { location: location}) }
          }}
        >
          { !!post.picture.url && <Image 
            source={{uri: post.picture.mobile.url }} 
            style={this.style} /> 
          }

          { !!post.video && <Video 
            source={{uri: post.video.url }}
            style={[this.style, styles.video, {borderRadius: 9, overflow: 'hidden', height: 210}]}
            repeat 
            muted />
          }

          <View style={[styles.wrapper]}>  
            <Text style={styles.overlayText}>{ this._renderInfo() }</Text>
          </View>
        </TouchableOpacity>
      </React.Fragment>
    );
  }
}
