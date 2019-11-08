import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Input, Button } from 'react-native-elements';
import UnitsOption from '../components/buttons/UnitsOption';
import { styles } from './styles';

export default class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  constructor(props) {
    super(props)
    this.state = { email: '', feet: null }
  }

  componentDidMount = async () => {
    let email = await AsyncStorage.getItem('userEmail')
    const unit = await AsyncStorage.getItem('feet')
    const feet = !!unit ? JSON.parse(unit) : this.saveUnits()
    this.setState({ email, feet })  
  }

  saveUnits = () => {
    AsyncStorage.setItem('feet', 'true')
    return true
  }

  logout = async () => {
    const { navigation } = this.props
    await AsyncStorage.clear()
    navigation.navigate('Auth');
  }

  changeUnit = () => {
    const { feet } = this.state
    const unit = JSON.stringify(!feet)
    AsyncStorage.setItem('feet', unit)
    this.setState({ feet: !feet })
  }

  render() {
    const { email, feet } = this.state
    const options_loaded = feet != null
    const { navigation } = this.props
    return (
      <React.Fragment>
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
              feet={feet} />
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
