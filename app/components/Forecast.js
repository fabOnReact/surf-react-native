import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'native-base';
import { styles } from './styles/ForecastStyles';

export default class Forecast extends Component {
  constructor(props) {
    super(props)
    this.state = { data: null }
  }

  renderRow (row) {
    const { hourly } = row
    return (
      <Text key={row.id}>{ hourly && hourly.waveHeight } mt. at <Text style={{color:'red'}}>{ row.name }</Text> (<Text style={{color:'blue'}}>{ row.distance } km.</Text>) </Text>
    )
  }

  renderForecast (data) {
    return (
      <View style={styles.container}>
        <Text style={{textAlign: "center"}}>{ data && data.map((row) => this.renderRow(row))}</Text>
      </View>
    )
  }

  render () { 
    const { data, index } = this.props
    if (index == 0 && !data) { return this.renderForecast(data); }
    else { return null; }
  }
}
