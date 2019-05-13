import React, { Component } from 'react';
import { Image } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Header } from 'react-navigation';
import Dimensions from 'Dimensions';
import Orientation from 'react-native-orientation';
import { updatePost } from '../lib/api' 
import { host } from '../config/constants';
import { errorMessage } from '../lib/support';

export default class Post extends Component {
  constructor(props) {
    super(props)
    const { post } = this.props
    this.style = { flex: 2, borderRadius: 9, width: null }
    this.height = Dimensions.get('window').height - Header.HEIGHT
    this.width = Dimensions.get('window').width - Header.HEIGHT
    this.state = { liked: post.liked, style: this.stylePortrait }
  }

  componentWillMount() {
    Orientation.addOrientationListener(this._imageStyles)
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener((orientation) => {});
  }

  _imageStyles = (orientation) => {
    if (orientation != 'PORTRAIT') { 
      this.setState({ style: this.styleLandscape })
    } else { 
      this.setState({ style: this.stylePortrait })
    }
  }

  get stylePortrait() { return { ...this.style, height: this.height/3 }}
  get styleLandscape() { return { ...this.style, height: this.width }}

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

  render() {
    const { liked } = this.state
    const { post, height } = this.props
    const iconColor = liked ? "blue" : "black"
    return (
      <Card transparent>
        <Image source={{uri: host + post.picture.url }} style={this.state.style} />
      </Card> 
    );
  }
}
