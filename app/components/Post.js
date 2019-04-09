import React, { Component } from 'react';
import { Image } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { updatePost, errorMessage } from '../lib/api' 
import { host } from '../config/constants';

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
      <Card>
        <CardItem cardBody>
          <Image source={{uri: host + post.picture.url }} style={{height: height, width: null, flex: 2}} />
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent>
              <Icon name="thumbs-up" onPress={this._liked} style={{color: iconColor }}/>
            </Button>
            <Body>
              <Text>{ post.city }</Text>
            </Body>
            <Right>
              <Text>{ post.date }</Text>
            </Right>
          </Left>
        </CardItem>
      </Card> 
    );
  }
}
