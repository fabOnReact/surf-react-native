import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'native-base';
import { styles } from './styles/HeaderStyles';

export default class Header extends Component {
  renderForecast (row) {
    return (
      <Text key={row.id}>{ row.forecast.waveHeight[0].value } mt. at <Text style={{color:'red'}}>{ row.name }</Text> (<Text style={{color:'blue'}}>{ row.distance } km.</Text>) </Text>
    )
  }

  render () { 
    const { data } = this.props
    return (
      <View style={styles.container}>
        <Text style={{textAlign: "center"}}>{ data && data.map((row) => this.renderForecast(row))}</Text>
      </View>
    )
  }
}
