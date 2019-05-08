import React, { Component } from 'react';
import { Image } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { updatePost } from '../lib/api' 
import { host } from '../config/constants';
import { errorMessage } from '../lib/support';

export default class Post extends Component {
  constructor(props) {
    super(props)
    const { post } = this.props
    this.state = { liked: post.liked }
  }

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
        <Image source={{uri: host + post.picture.url }} style={{height: height, width: null, flex: 2, borderRadius: 9}} />
      </Card> 
    );
  }
}
