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
    const { forecast } = row
    return (
      <Text key={row.id}>{ forecast && forecast.waveHeight[0].value } mt. at <Text style={{color:'red'}}>{ row.name }</Text> with id { row.id } (<Text style={{color:'blue'}}>{ row.distance } km.</Text>) </Text>
    )
  }

  renderForecast (data) {
    return (
      <View style={styles.container}>
        <Text style={{textAlign: ""}}>{ data &&  data.map((row) => this.renderRow(row))}</Text>
      </View>
    )
  }

  render () { 
    const { data, index } = this.props
    if (index == 0) { return this.renderForecast(data); }
    else { return null; }
  }
}
