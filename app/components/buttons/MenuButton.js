import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function MenuButton({ action }){
  return (
    <TouchableOpacity
      onPress={() => console.warn('press')}
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
    shadowColor: 'rgba(0,0,0, 1)', 
    shadowOffset: { height: 3, width: 3 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
    marginTop: -5,
  },
})
