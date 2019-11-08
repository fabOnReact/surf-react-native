import React, { Component } from "react";
import { StatusBar, StyleSheet, FlatList, Button, Text, View } from "react-native";
import { Container, Content, List } from 'native-base';
import { Header } from 'react-navigation';
import DeviceInfo from 'react-native-device-info';
import Link from '../components/menu/Link';

export default class MenuScreen extends Component {
  render() {
    const { navigation } = this.props
    const locations = navigation.getParam("locations")
    const imperial = navigation.getParam("imperial")
    return (
      <Content>
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
  list: {
    // marginTop: Header.HEIGHT,
  },
  button: {
    position: "absolute",
    top: Header.HEIGHT,
    right: 15,
    // zIndex: 3,
  },
})
