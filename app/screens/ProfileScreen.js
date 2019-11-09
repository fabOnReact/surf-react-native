import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from 'react-navigation';
import { Input, Button } from 'react-native-elements';
import UnitsOption from '../components/buttons/UnitsOption';
import { styles } from './styles';

export default class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  constructor(props) {
    super(props)
    this.state = { email: '', imperial: null }
  }

  componentDidMount = async () => {
    let email = await AsyncStorage.getItem('userEmail')
    const unit = await AsyncStorage.getItem('imperial')
    const imperial = !!unit ? JSON.parse(unit) : this.saveUnits()
    this.setState({ email, imperial })  
  }

  saveUnits = () => {
    AsyncStorage.setItem('imperial', 'true')
    return true
  }

  logout = async () => {
    const { navigation } = this.props
    await AsyncStorage.clear()
    navigation.navigate('Auth');
  }

  changeUnit = () => {
    const { imperial } = this.state
    const unit = JSON.stringify(!imperial)
    AsyncStorage.setItem('imperial', unit)
    this.setState({ imperial: !imperial })
  }

  render() {
    const { navigation } = this.props
    const updateProfileSettings = navigation.getParam('updateProfileSettings')
    const { email, imperial } = this.state
    const options_loaded = imperial != null
    return (
      <React.Fragment>
        <NavigationEvents
          onWillBlur={() => updateProfileSettings()} />
        <View style={styles.container}>
          <Input
            style={styles.container}
            autoCapitalize="none"
            onChangeText={text => this.setState({ email: text })}
            value={email}
          />
          { 
            options_loaded  && <UnitsOption 
              action={this.changeUnit}
              imperial={imperial} />
          }
          <Button
            title="Logout"
            onPress={() => this.logout()}
            buttonStyle={styles.button}
          />
          <Button
            title="Privacy Policy"
            onPress={() => navigation.navigate("WebView", { path: "/pages/privacy.html", title: "Privacy" })}
            buttonStyle={styles.button}
          />
          <Button
            title="Credits"
            onPress={() => navigation.navigate("WebView", { path: "/pages/credits.html", title: "Credits" })}
            buttonStyle={styles.button}
          />
        </View>
      </React.Fragment>
    );
  }
}

const profile = StyleSheet.create({
  radio: {
  },
  text: {
    fontSize: 20
  },
})
