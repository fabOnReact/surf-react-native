import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { styles } from './styles';
import { profile } from './styles/ProfileStyles';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { email: '' }
  }

  componentWillMount = async () => {
    // let token = await AsyncStorage.getItem('userToken')
    let email = await AsyncStorage.getItem('userEmail')
    this.setState({ email })  
  }

  logout = async () => {
    const { navigation } = this.props
    await AsyncStorage.clear()
    navigation.navigate('Auth');
  }

  update() {
    console.warn('Updated user');
  }


  render() {
    const { email } = this.state
    return (
      <React.Fragment>
        <View style={styles.container}>
          <Text style={profile.text}>Profile</Text>
          <Input
            style={styles.container}
            autoCapitalize="none"
            onChangeText={text => this.setState({ email: text })}
            value={email}
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
