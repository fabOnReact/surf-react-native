import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../screens/styles';

export const getErrors = (json) => {
  let errors = "";
  for (var element in json) { 
    errors += `the field ${element} ${json[element]}, ` 
  }
  return errors
}

export function ErrorMessage(props) {
  const { message } = props;
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{ message }</Text>
    </View>
  );
}
