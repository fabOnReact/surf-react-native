import React, { Component } from 'react';
import { H1, H2, H3, H4 } from 'native-base';
import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'

export default class Chart extends Component {
  render() {
    const { values, labels, bezier, margin } = this.props
    const screenWidth = Dimensions.get('window').width - margin
    const chartConfig = {
      backgroundGradientFrom: 'white',
      backgroundGradientTo: 'white',
      color: (opacity = 1) => `rgba(23, 79, 23)`,
      decimalPlaces: 1,
      strokeWidth: 0,
    }
    const data= {
      labels: labels,
      datasets: [{
        data: values,
        strokeWidth: 2 
      }]
    }
    return (
      <React.Fragment>
        <LineChart
          data={data}
          width={screenWidth}
          height={200}
          chartConfig={chartConfig}
          withInnerLines={false}
          withOuterLines={false}
          withDots={false}
          bezier={bezier}
        />
      </React.Fragment>
    )
  }
}
