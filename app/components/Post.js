import React from 'react';
import { Image } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Body, Right } from 'native-base';
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
            <Text>{ post.location }</Text>
          </Body>
          <Right>
            <Text>{ post.date }</Text>
          </Right>
        </Left>
      </CardItem>
    </Card> 
  );
}
