import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function MenuButton({ action, style }){
  return (
    <TouchableOpacity
      onPress={action}
      style={styles.container}
    >
      <Icon name="md-menu" 
        size={50} 
        color="white"
        style={styles.icon}/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 15,
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
    marginTop: -5,
  },
})
