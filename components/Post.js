import React from 'react';
import { Image } from 'react-native';
import { styles } from './styles';
import { host } from '../redux/constants.js';
import FitImage from 'react-native-fit-image';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

export function Post(props) {
  const { post } = props;
  return (
    <Card>
      <CardItem>
        <Left>
          <Thumbnail source={{uri: 'https://s3.eu-central-1.amazonaws.com/fabriziobertoglio/profile.jpg' }} />
          <Body>
            <Text>NativeBase</Text>
            <Text note>GeekyAnts</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody>
        <Image source={{uri: host + post.picture.url }} style={{height: 200, width: null, flex: 1}}/>
      </CardItem>
      <CardItem>
        <Left>
          <Button transparent>
            <Icon active name="thumbs-up" />
            <Text>12 Likes</Text>
          </Button>
        </Left>
        <Body>
          <Button transparent>
            <Icon active name="chatbubbles" />
            <Text>4 Comments</Text>
          </Button>
        </Body>
        <Right>
          <Text>11h ago</Text>
        </Right>
      </CardItem>
    </Card> 
  );
}