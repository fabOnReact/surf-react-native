import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../screens/styles';

export default function ErrorMessage(props) {
  const { message } = props;
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{ message }</Text>
    </View>
  );
}
