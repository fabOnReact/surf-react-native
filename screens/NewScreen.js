/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { styles } from './styles';

export default class NewScreen extends Component {

  render() {
    const { navigation } = this.props;
    return (
      <React.Fragment>
          <Text>New Screen</Text>
          <Button
            title="Index"
            onPress={() => navigation.navigate('Index')}
            buttonStyle={styles.button}
          />
      </React.Fragment>
    );
  }
}