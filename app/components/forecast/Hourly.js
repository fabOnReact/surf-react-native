import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Swell from '../forecast/Swell';
import Wind from '../forecast/Wind';
import Arrow from '../icons/Arrow';
import DeviceInfo from 'react-native-device-info';
import Data from '../../lib/data';
import { header } from '../forecast/styles';

export default class Hourly extends Component {
  renderHourly(hourly) {
    const { imperial } = this.props
    const { 
      optimal_swell, swellDirection, swellDirectionInWord, 
      windDirection, optimal_wind, windDirectionInWord,
      swellPeriod } = hourly
    const data = new Data({...hourly, imperial })
    const swellIcon = require('../../images/down-cursor-black.png')
    const windIcon = require('../../images/down-arrow-black.png')
    return (
      <React.Fragment>
        <View style={styles.container}>
          <Arrow
            offshore={optimal_swell}
            direction={swellDirection}
            icon={swellIcon} />
          <Swell
            period={swellPeriod} 
            text={data.swell}
            styles={[
              { marginLeft: 10 },
              header.shadowHeader,
            ]}
          />
          <Wind 
            text={data.wind}
            styles={[
              { marginLeft: 10 },
              header.shadowHeader,
            ]}
          />
          <Arrow
            offshore={optimal_wind}
            direction={windDirection}
            icon={windIcon}
          />
        </View>
      </React.Fragment>
    )
  }

  render() {
    const {hourly } = this.props
    const { swellHeight } = hourly
    return (
      <React.Fragment>
        { !!swellHeight && this.renderHourly(hourly) }
      </React.Fragment>
    )
  }
}

const has_notch = DeviceInfo.hasNotch()
export const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: 'absolute',
    top: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 15,
  }, 
})
