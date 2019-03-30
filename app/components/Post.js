import React from 'react';
import { Image } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Body } from 'native-base';
import { host } from '../config/constants';

export default function Post(props) {
  const { post, height } = props;
  return (
    <Card>
      <CardItem cardBody>
        <Image source={{uri: host + post.picture.url }} style={{height: height, width: null, flex: 2}} />
      </CardItem>
      <CardItem>
        <Left>
          <Button transparent>
            <Icon active name="thumbs-up" />
          </Button>
          <Body>
            <Text>{ post.description }</Text>
          </Body>
        </Left>
      </CardItem>
    </Card> 
  );
}
