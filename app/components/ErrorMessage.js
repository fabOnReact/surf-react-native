import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function ErrorMessage(props) {
  const { message, styles } = props;
  return (
    <View style={[classes.errorContainer, styles]}>
      <Text style={classes.errorText}>{ message }</Text>
    </View>
  );
}

export const classes = StyleSheet.create({
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
