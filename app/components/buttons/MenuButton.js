import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function MenuButton({ action }){
  return (
    <Icon name="md-menu" 
      size={50} 
      color="white"
      onPress={action}
      style={styles.container}/>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 15,
    shadowColor: 'rgba(0,0,0, 1)', 
    shadowOffset: { height: 3, width: 3 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
    marginTop: -5,
  },
})
