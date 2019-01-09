import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';
import { host } from '../redux/constants.js';
import FitImage from 'react-native-fit-image';

export function Post(props) {
  const { post } = props;
  // const { description } = props;
  return (
    <FitImage style={styles.image} source={{uri: host + post.picture.url }}>
      <View style={styles.container}>
        <Text style={styles.text}>{ post.description }</Text>
      </View>
    </FitImage>
  );
}