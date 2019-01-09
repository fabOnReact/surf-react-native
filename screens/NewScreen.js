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
        <View style={{flex: 1}}>
          <ScrollView>main</ScrollView>
          <View><Text>footer</Text></View>
        </View>
          <Button
            title="Index"
            onPress={() => navigation.navigate('Index')}
            buttonStyle={styles.button}
          />
      </React.Fragment>
    );
  }
}