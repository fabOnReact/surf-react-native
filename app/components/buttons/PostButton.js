import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import DateHelper from '../../lib/date_helper';

export default function PostButton({ data, action, index, selected }) {
  const is_selected = index == selected
  const button_color = is_selected ? styles.highlight : styles.normal
  const text_color = is_selected ? styles.text_highlight: styles.text_normal
  const date = new DateHelper(data.created_at)
  const how_long_ago = date.distance
  return (
    <React.Fragment>
      <TouchableOpacity 
        style={[
          styles.button,
          button_color
        ]}
        onPress={() => action(index)}
      >
        <Text
          style={text_color}>
          { how_long_ago }
        </Text>
      </TouchableOpacity>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 30,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  }, 
  highlight: {
    borderColor: 'red',
    backgroundColor: '#ffff66',
    borderWidth: 2,
  },
  normal: {
    borderColor: 'white',
    borderWidth: 2,
  },
  text_highlight: {
    color: 'red',
    fontWeight: '900',
  },
  text_normal: {
    color: 'white',
    fontWeight: '500',
  }
})
