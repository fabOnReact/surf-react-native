import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function FlagButton({ action }){
  return (
    <TouchableOpacity
      onPress={action}
      style={styles.container}
    >
      <Icon name="md-flag" 
        size={25} 
        color="white"
        style={styles.icon}/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    right: 25,
    zIndex: 3,
  },
  icon: {
    shadowColor: 'black', 
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    textShadowOffset: { height: 1, width: 1},
    textShadowRadius: 1,
    elevation: 1,
  },
})
