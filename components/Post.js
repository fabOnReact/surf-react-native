import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

export function Post(props) {
  const { post } = props;
  // const { description } = props;
  return (
    <View>
    {/*
      <Text>{ post.description }</Text>
      <Text>{ post.latitude }</Text>
      <Text>{ post.longitude }</Text>
      <Text>{ post.picture.url }</Text>
      */}
      <Text>{post.description}</Text>
    </View>
  );
}