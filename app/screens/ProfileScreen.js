import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { styles } from './styles';
import { host, headers } from '../config/constants';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { email: '', token: '' }
  }

  componentWillMount = async () => {
    token = await AsyncStorage.getItem('userToken')
    email = await AsyncStorage.getItem('userEmail')
    this.setState({ email: email, token: token })  
  }

  update() {
    console.warn('Updated user');
  }

  logout = async () => {
    await AsyncStorage.clear()
    this.props.navigation.navigate('Auth');
  }

  render() {
    return (
      <React.Fragment>
        <View style={styles.container}>
          <Text style={styles.text}>Profile</Text>
          <Input
            style={styles.container}
            autoCapitalize="none"
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
          />
          <Button
            title="Update User"
            onPress={this.update}
            buttonStyle={styles.button}
          />
          <Button
            title="Logout"
            onPress={this.logout}
            buttonStyle={styles.button}
          />
          <Button
            title="Delete User"
            onPress={this.delete}
            buttonStyle={styles.button}
          />
        </View>
      </React.Fragment>
    );
  }
}
