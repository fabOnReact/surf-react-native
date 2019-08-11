import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Body, Right, View } from 'native-base';
import { Header } from 'react-navigation';
import Dimensions from 'Dimensions';
import Orientation from 'react-native-orientation';
import { updatePost } from '../lib/api' 
import { host } from '../config/constants';
import { errorMessage, isPresent } from '../lib/support';
import { styles } from  './styles/PostStyles';

export default class Post extends Component {
  constructor(props) {
    super(props)
    this.state = { liked: null, style: '' }
  }

  componentWillMount() { Orientation.addOrientationListener(this._imageStyles) } 
  componentWillUnmount() { Orientation.removeOrientationListener(this._imageStyles) }
  componentDidMount() {
    const { post } = this.props
    this.style = { flex: 2, borderRadius: 9, width: null }
    this.height = Dimensions.get('window').height - Header.HEIGHT
    this.width = Dimensions.get('window').width - Header.HEIGHT/2
    this.setState({ liked: post.liked, style: this.stylePortrait })
  }

  _imageStyles = (orientation) => {
    if (orientation != 'PORTRAIT') { 
      this.setState({ style: this.styleLandscape })
    } else { 
      this.setState({ style: this.stylePortrait })
    }
  }

  get stylePortrait() { return { ...this.style, height: this.height/3 }}
  get styleLandscape() { return { ...this.style, width: this.width }}

  _liked = () => {
    const { post } = this.props
    const { id } = post
    const { liked } = this.state
    this.setState({ liked: !liked }, () => { 
      let body = JSON.stringify({ post: { liked: this.state.liked}})
      let options = { id, body}
      updatePost(options, this._success, this._failure)
    })
  }

  _renderInfo() {
    const { location } = this.props.post
    const { waveHeight } = location.forecast.hourly
    if (waveHeight) { return `${waveHeight} mt. at ${location.name}` }
    else return location.name
  }

  render() {
    const { liked } = this.state
    const { navigation, post, height, index } = this.props
    const { location } = post
    const { forecast } = location
    const iconColor = liked ? "blue" : "black"
    return (
      <React.Fragment>
        <TouchableOpacity 
          onPress={() => { 
            if (isPresent(forecast)) { navigation.navigate('Show', { post: post }) }
          }}
        >
          <Image source={{uri: post.picture.mobile.url }} style={this.state.style} />
          <View style={[styles.wrapper]}>  
            <Text style={styles.overlayText}>{ this._renderInfo() }</Text>
          </View>
        </TouchableOpacity>
      </React.Fragment>
    );
  }
}
