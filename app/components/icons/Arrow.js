import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';

export default class Arrow extends Component {
  render() {
    const { offshore, direction, icon } = this.props
    const defaultColor = "white"
    const is_available = offshore != null
    const directionColor = offshore ? "#27ae60" : "#e67e22" 
    const iconColor = is_available ? directionColor : defaultColor
    return (
      <Image 
        source={icon}
        style={[
          { tintColor: iconColor },
          styles.icon, 
          { transform: [{ rotateZ: `${direction}deg`}] } 
        ]}
      />
    )
  }
}

export const styles = StyleSheet.create({
  icon : { 
    height: 20, 
    width: 20, 
  }
})
