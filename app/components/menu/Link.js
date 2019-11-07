import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";

export default class Link extends Component {
  render() {
    const { data: { attributes: { name }}} = this.props
    return (
      <Text
        style={styles.link}>
        { name }
      </Text>
    )
  }
}

export const styles = StyleSheet.create({
  link: {
    height: 50,
    borderWidth: 1,
    borderColor: 'red',
  }
})
