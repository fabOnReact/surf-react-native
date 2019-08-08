import React, { Component } from 'react';
import { H1, H2, H3, H4 } from 'native-base';
import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'

export default class Tide extends Component {
  render() {
    var { hours, seaLevels } = this.props.data
    const chartConfig = {
      backgroundGradientFrom: 'white',
      backgroundGradientTo: 'white',
      color: (opacity = 1) => `rgba(23, 79, 23)`,
      decimalPlaces: 0,
      strokeWidth: 0,
    }
    const screenWidth = Dimensions.get('window').width - 50
    const beginning = new Date(hours[0]).getHours()
    const end = new Date(hours.slice(-1)).getHours()
    hours  = hours.map(date => new Date(date).getHours()).filter(hour => hour % 3 == 0) 
    const labels = hours.map(( time) => new Date(time).getHours())
    const data = {
      labels: hours,
      datasets: [{
        data: seaLevels,
        strokeWidth: 2 
      }]
    }
    return (
      <React.Fragment>
        <H3 style={{ textAlign: 'center', marginTop: 10 }}>Next 24h Tide mt.</H3>
        <LineChart
          data={data}
          width={screenWidth}
          height={180}
          chartConfig={chartConfig}
          withInnerLines={false}
          withOuterLines={false}
          withDots={false}
        />
      </React.Fragment>
    )
  }
}
