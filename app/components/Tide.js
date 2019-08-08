import React, { Component } from 'react';
import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'

export default class Tide extends Component {
  render() {
    const chartConfig = {
      backgroundGradientFrom: '#1E2923',
      backgroundGradientTo: '#08130D',
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2,
    }
    const screenWidth = Dimensions.get('window').width
    const data = {
      labels: ['10', '11', '12', '13', '14', '15'],
      datasets: [{
        data: [ 2, 4, 2, 0, 1, 0],
        color: (opacity = 1) => `rgba(25, 121, 56, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }]
    }
    return (
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
      />
    )
  }
}
