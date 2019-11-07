import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem, Left, Right, Icon } from 'native-base';

export default class Link extends Component {
  showPost = () => {
    const { location, navigation } = this.props
    navigation.navigate("Show", { location })
  }

  render() {
    const { location: { data: { attributes }}, navigation } = this.props
    const { name, distance, forecast_info: { hourly }} = attributes
    const { swellHeight, swellPeriod } = hourly
    return (
      <ListItem
        // style={styles.list}
        onPress={this.showPost}
        noIndent>
        <Left
          style={styles.left}>
          <Text>{ name } <Text style={{color:'red'}}>({ distance } km.)</Text></Text>
        </Left>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    )
  }
}

export const styles = StyleSheet.create({
  list: {
    marginLeft: 0,
  },
  left: {
    marginLeft: 5,
  },
  link: {
    fontSize: 20,
  }
})
