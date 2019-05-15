import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { styles } from './styles';
import { profile } from './styles/ProfileStyles';

export default class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  constructor(props) {
    super(props)
    this.state = { email: '' }
  }

  componentWillMount = async () => {
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
          <Input
            style={styles.container}
            autoCapitalize="none"
            onChangeText={text => this.setState({ email: text })}
            value={email}
          />
          <Button
            title="Logout"
            onPress={this.logout}
            buttonStyle={styles.button}
          />
          <Button
            title="Privacy Policy"
            onPress={this.privacy}
            buttonStyle={styles.button}
          />
          <Button
            title="Credits"
            onPress={this.credits}
            buttonStyle={styles.button}
          />
        </View>
      </React.Fragment>
    );
  }
}
