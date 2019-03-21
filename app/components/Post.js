import React from 'react';
import { Image } from 'react-native';
import { styles } from './styles';
import { host } from '../config/constants.js';
import FitImage from 'react-native-fit-image';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

export function Post(props) {
  const { post, height } = props;
  return (
    <Card>
      <CardItem cardBody>
        <Image source={{uri: host + post.picture.url }} style={{height: height, width: null, flex: 2}}/>
      </CardItem>
      <CardItem>
        <Left>
          <Button transparent>
            <Icon active name="thumbs-up" />
          </Button>
        <Body><Text>{ post.description }</Text></Body>
        </Left>
      </CardItem>
    </Card> 
  );
}
