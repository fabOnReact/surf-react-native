/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import {
  StyleSheet, View, AsyncStorage
} from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from './styles';

export default class HomeScreen extends Component {
  static navigationOptions = { title: 'Welcome to the app!', }

  _showMoreApp = () => {
    const { navigation } = this.props;
    navigation.navigate('Main');
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    const { navigation } = this.props;
    navigation.navigate('Auth');
  }

  render() {
    return (
      <React.Fragment>
        <View style={styles.container}>
          <Button title="Show me more of the app" onPress={this._showMoreApp} />
          <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
        </View>
      </React.Fragment>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   }
// });
