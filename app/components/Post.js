import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Header } from 'react-navigation';
import Video from 'react-native-video';
import Dimensions from 'Dimensions';
import Orientation from 'react-native-orientation';
import ForecastInfo from './ForecastInfo';
import { getAsset } from '../lib/support';

export default class Post extends Component {
  constructor(props) {
    super(props)
    this.state = { portrait: null, width: null, height: null }
  }

  componentWillMount() { Orientation.addOrientationListener(this._imageStyles) } 
  componentDidMount() { this._imageStyles("PORTRAIT") }
  componentWillUnmount() { Orientation.removeOrientationListener(this._imageStyles) }

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
    const new_width = Dimensions.get('window').width
    if (orientation != 'PORTRAIT') { 
      this.setState({ width: new_width - Header.HEIGHT/2, portrait: false })
    } else { 
      const new_height = (Dimensions.get('window').height - Header.HEIGHT)/3
      this.setState({ width: new_width, height: new_height, portrait: true })
    }
  }

  render() {
    const { navigation, post } = this.props
    const { location } = post
    const { forecast_info } = location
    var video_source, image_source
    if (!!post && !!post.video) { 
      video_source = getAsset(post.video.url_name) || {uri: post.video.url}
      image_source = getAsset(post.video.poster_name) || post.video.poster
    } 
    const absolute = { 
      position: 'absolute', width: "100%",
      alignItems: 'center', bottom: 5, 
    }
    return (
      <React.Fragment>
        <TouchableOpacity 
          onPress={() => { 
            if (forecast_info) { navigation.navigate('Forecast', { location: location, post: post }) }
          }}
        >
          { 
            !!post.picture.url && ( 
              <Image 
                source={{uri: post.picture.mobile.url }} 
                style={this.style} 
              /> 
            )
          }

          { 
            !!post.video && (
              <Video 
                source={video_source}
                poster={image_source}
                posterResizeMode="cover"
                resizeMode="cover"
                style={{ borderRadius: 9, aspectRatio: 1.7, width: "100%" }}
                repeat 
                muted 
              />
            )
          }

          <ForecastInfo location={location} style={absolute} />
        </TouchableOpacity>
      </React.Fragment>
    );
  }
}
