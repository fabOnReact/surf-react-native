/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { styles } from './styles';
import { RNCamera } from 'react-native-camera';

export default class NewScreen extends Component {

  render() {
    const { navigation } = this.props;
    return (
      <React.Fragment>
        <Button
          title="Index"
          onPress={() => navigation.navigate('Index')}
          buttonStyle={styles.button}
        />
      </React.Fragment>
    );
  }
}