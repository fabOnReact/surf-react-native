import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Header } from 'react-navigation';
import Video from 'react-native-video';
import Dimensions from 'Dimensions';
import Orientation from 'react-native-orientation';
import { updatePost } from '../lib/api';
import ForecastInfo from '../components/ForecastInfo';
import { host } from '../config/constants';
import { errorMessage, isPresent } from '../lib/support';
import { styles } from  './styles/PostStyles';
import { getAsset } from '../lib/support';

export default class Post extends Component {
  constructor(props) {
    super(props)
    this.state = { liked: null, style: '', portrait: null, width: null, height: null, video_height: 0 }
  }

  componentWillMount() { Orientation.addOrientationListener(this._imageStyles) } 
  componentWillUnmount() { Orientation.removeOrientationListener(this._imageStyles) }
  componentDidMount() { this._imageStyles("PORTRAIT") }

  _imageStyles = (orientation) => {
    const new_width = Dimensions.get('window').width
    if (orientation != 'PORTRAIT') { 
      this.setState({ width: new_width - Header.HEIGHT/2, portrait: false })
    } else { 
      const new_height = (Dimensions.get('window').height - Header.HEIGHT)/3
      this.setState({ width: new_width, height: new_height, video_height: new_height - 40, portrait: true })
    }
  }

  get style() { 
    const { height, width, portrait } = this.state
    const style = { flex: 2, borderRadius: 9, width: null, height:null }
    switch(portrait) {
      case true:
        return { ...style, height: height }
        break
      case false:
        return { ...style, height: width }
        break
      default:
        // console.log("impossible to choose correct style")
    }
  }

  render() {
    const { height, video_height, width } = this.state
    const { navigation, post, index } = this.props
    const { location } = post
    const { forecast_info } = location
    var video_source, image_source
    if (!!post && !!post.video) { 
      video_source = getAsset(post.video.url_name) || {uri: post.video.url}
      image_source = getAsset(post.video.poster_name) || post.video.poster
    } 
    return (
      <React.Fragment>
        <TouchableOpacity 
          onPress={() => { 
            if (forecast_info) { navigation.navigate('Forecast', { location: location, post: post }) }
        }}>
          { 
            !!post.picture.url && <Image 
            source={{uri: post.picture.mobile.url }} 
            style={this.style} /> 
          }

          { 
            !!post.video && <Video 
            source={video_source}
            poster={image_source}
            posterResizeMode={"cover"}
            resizeMode={"cover"}
            style={{ borderRadius: 9, aspectRatio: 1.7, width: "100%" }}
            repeat 
            muted />
          }

          <ForecastInfo location={location} />
        </TouchableOpacity>
      </React.Fragment>
    );
  }
}
