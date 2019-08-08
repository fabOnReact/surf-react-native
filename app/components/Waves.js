import React, { Component } from 'react';
import { BarChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'

export default class Waves extends Component {
  render() {
    const chartConfig = {
      backgroundGradientFrom: '#1E2923',
      backgroundGradientTo: '#08130D',
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2,
    }
    const screenWidth = Dimensions.get('window').width
    const data = {
      labels: ['Monday', 'Tuesday', 'Wensday', 'Thurs', 'Friday', 'Saturday'],
      datasets: [{
        data: [ 2, 1, 3, 4, 1, 0.3 ]
      }]
    }
    return (
      <BarChart
        style={graphStyle}
        data={data}
        width={screenWidth}
        height={220}
        yAxisLabel={'$'}
        chartConfig={chartConfig}
      />
    )
  }
}
