import React, { Component } from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';
import { Card } from 'native-base';
import { Header } from 'react-navigation';
import Video from 'react-native-video';
import Dimensions from 'Dimensions';
import Orientation from 'react-native-orientation';
import ForecastInfo from './ForecastInfo';
import { getAsset } from '../lib/support';

export default class Posts extends Component {
  constructor(props) {
    super(props)
    this.state = { portrait: null, width: null, height: null }
  }

  componentWillMount() { Orientation.addOrientationListener(this._imageStyles) } 
  componentDidMount() { this._imageStyles("PORTRAIT") }
  componentWillUnmount() { Orientation.removeOrientationListener(this._imageStyles) }

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
    const { posts } = this.props
    if(posts.length == 0) {
      console.warn('Posts.js rendered with posts: ', posts);
    }
    // console.warn(this.props.posts[0]);
    // if(!!posts[0]) { console.error(posts[0]) }
    // const { video: { url }} = posts[0]
    // const { video: { poster }} = posts[0]
    const absolute = { 
      position: 'absolute', width: "100%",
      alignItems: 'center', bottom: 5, 
    }
    return (
      <React.Fragment>
        <Card trasparent style={{flex: 1}}>
          <Text>Post</Text>
        </Card>
        {/*
        <Video 
          // source={{ uri: url }}
          // poster={poster}
          posterResizeMode="cover"
          resizeMode="cover"
          style={{ borderRadius: 9, aspectRatio: 1.7, width: "100%" }}
          repeat 
          muted 
        />
        */}
      </React.Fragment>
    );
  }
}
