import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

function RadioButton({ action, styles, selected}){
  const icon = selected  ? 'md-radio-button-on' : 'md-radio-button-off'
  const  changeUnit = selected ? null : action
  return (
    <Icon 
      name={icon}
      size={25} 
      color="black" 
      onPress={changeUnit}
      // style={[styles.icon, styles]}
    />
  )
}

export default function UnitsOption({ action, feet}) {
  return (
    <View
      style={styles.container}> 
      <RadioButton 
        action={action}
        selected={!feet} />
      <Text>mt.</Text>
      <RadioButton 
        action={action}
        selected={feet} />
      <Text>ft.</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingLeft: "30%",
    paddingRight: "30%",
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor: 'red',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  }
})
