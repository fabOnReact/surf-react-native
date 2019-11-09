import React, { Component } from "react";
import { StatusBar, StyleSheet, FlatList, Button, Text, View } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import { Container, Content, List } from 'native-base';
import { Header } from 'react-navigation';
import DeviceInfo from 'react-native-device-info';
import Link from '../components/menu/Link';
import Api from '../lib/api';

export default class MenuScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { locations: [], spinner: true }
    const { navigation } = this.props
    const credentials = navigation.getParam("credentials")
    this.api = new Api(credentials)
    this.api.page = 1
    this.api.per_page = 15
  }

  componentDidMount = async () => {
    const request =  await this.api.getLocations({ flags: ["&with_cameras=true"] })
    const locations = await request.json()
    this.setState({ locations, spinner: false })
  }
  
  render() {
    const { navigation } = this.props
    const { spinner, locations } = this.state
    const imperial = navigation.getParam("imperial")
    return (
      <Content>
        <Spinner
          visible={spinner}
          textContent={'Loading Locations...'}
          textStyle={styles.spinnerTextStyle}
        />
        <List>
          <FlatList
            data={locations}
            keyExtractor={(item, index) => index.toString() }
            pagingEnabled
            style={styles.list}
            renderItem={({ item, index }) => { 
              return (
                <Link 
                  location={item} 
                  imperial={imperial} 
                  {...this.props} /> 
              )
            }}
          />
        </List>
      </Content>
    );
  }
}

const has_notch = DeviceInfo.hasNotch()
export const styles = StyleSheet.create({
  modal: {
    margin: 17,
    marginTop: has_notch ? 50 : StatusBar.currentHeight,
    borderRadius: 15,
    backgroundColor: 'white',
  }, 
  container: {
    marginTop: Header.HEIGHT,
  },
  button: {
    position: "absolute",
    top: Header.HEIGHT,
    right: 15,
  },
  spinnerTextStyle: {
    color: 'black',
  },
})
