import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'native-base';
import { styles } from './styles/ForecastStyles';

export default class Forecast extends Component {
  constructor(props) {
    super(props)
    this.state = { locations: null }
  }

  renderRow (row) {
    const { hourly } = row
    return (
      <Text key={row.id}>{ this.renderText(hourly) }<Text style={{color:'red'}}>{ row.name }</Text> (<Text style={{color:'blue'}}>{ row.distance } km.</Text>) </Text>
    )
  }

  renderText(locations) {
    if(locations) { return `#{locations.waveHeight} mt. at` }
  }

  renderForecast (locations) {
    return (
      <View style={styles.container}>
        <Text style={{textAlign: "center"}}>{ locations && locations.map((row) => this.renderRow(row))}</Text>
      </View>
    )
  }

  render () { 
    const { locations, index } = this.props
    if (index == 0 && !!locations) { return this.renderForecast(locations); }
    else { return null; }
  }
}
