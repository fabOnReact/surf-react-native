import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'native-base';
import { styles } from './styles/ForecastStyles';

export default class Forecast extends Component {
  constructor(props) {
    super(props)
    this.state = { data: null }
  }

  renderForecast (row) {
    const { forecast } = row
    return (
      <Text key={row.id}>{ forecast && forecast.waveHeight[0].value } mt. at <Text style={{color:'red'}}>{ row.name }</Text> (<Text style={{color:'blue'}}>{ row.distance } km.</Text>) </Text>
    )
  }

  render () { 
    const { data, index } = this.props
    return (
      <View style={styles.container}>
        <Text style={{textAlign: "center"}}>{ data && index == 0 && data.map((row) => this.renderForecast(row))}</Text>
      </View>
    )
  }
}
