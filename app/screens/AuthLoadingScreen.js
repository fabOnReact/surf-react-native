import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { AsyncStorage } from 'react-native';
import { styles } from './styles';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync(); // eslint-disable-line
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const { navigation } = this.props;
    navigation.navigate(userToken ? 'App' : 'Auth');
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
