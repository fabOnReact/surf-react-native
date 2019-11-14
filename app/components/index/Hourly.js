import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Swell from '../forecast/Swell';
import Wind from '../forecast/Wind';
import Arrow from '../icons/Arrow';
import FlagButton from '../buttons/FlagButton';
import { header } from '../forecast/styles';
import Data from '../../lib/data';

export default class Hourly extends Component {
  constructor(props) {
    super(props)
    this.state = { visible: false }
  }

  onFlagPress = () => {
    const { navigation, post, credentials } = this.props
    navigation.navigate("Flag", { post, credentials })
  }

  renderHourly(data) {
    return (
      <React.Fragment>
        <Swell
          text={data.swell}
          styles={[
            header.text,
            header.shadowHeader,
          ]}
        />
        <Wind 
          text={data.wind}
          styles={[
            header.text,
            header.shadowHeader, 
          ]}
        />
      </React.Fragment>
    )
  }

  render() {
    const { location, post, imperial } = this.props
    const { visible } = this.state
    const { reported } = post
    const iconColor = reported ? "red" : "white"
    const { name, forecast_info: { hourly, tide_data }} = location
    const { forecast } = post
    const data = new Data({...forecast, imperial })

    return (
      <React.Fragment>
        <View style={styles.container}>
          <FlagButton 
            action={this.onFlagPress} 
            style={iconColor}
          />
          <Text style={[
            header.shadowHeader,
            header.text,
          ]}>
            { name }
          </Text>
          { !!hourly && this.renderHourly(data) }
        </View>
      </React.Fragment>
    )
  }
}

const has_notch = DeviceInfo.hasNotch()
export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: has_notch ? 0 : 30,
    width: "100%",
    zIndex: 4,
    height: 90,
  }, 
})
