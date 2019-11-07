import React, { Component } from "react";
import { StyleSheet, FlatList, Button, Text, View } from "react-native";
import { Header } from 'react-navigation';
import CloseModal from './buttons/CloseModal';
import Modal from "react-native-modal";

export default class Menu extends Component {
  render() {
    const { visible, toggle, locations } = this.props
    const data = [{text:1}]
    return (
      <Modal 
        isVisible={visible}
        coverScreen={true}
        animationIn='slideInLeft'
        animationOut='slideOutLeft'
        animationInTiming={600}
        style={styles.container}>
        <CloseModal 
          action={toggle}
          styles={styles.button}
        />
        <FlatList
          data={locations}
          keyExtractor={(item, index) => index.toString() }
          pagingEnabled
          style={styles.list}
          renderItem={({ location, index }) => <Link location={location}/>}
        />
      </Modal>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: Header.HEIGHT - 10,
    borderRadius: 15,
    backgroundColor: 'white',
  }, 
  button: {
    position: 'absolute',
    top: 7,
    right: 20,
  },
  list: {
    margin: 10,
    marginTop: 60,
  },
})
