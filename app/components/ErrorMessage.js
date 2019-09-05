import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function ErrorMessage(props) {
  const { message } = props;
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{ message }</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  errorContainer: {
    borderColor: 'black',
    borderWidth: 2,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 50,
    paddingLeft: 50,
    backgroundColor: 'red',
  },
  errorText: {
    fontSize: 18,
    color: 'white',
  }
});
