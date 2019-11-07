import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Swell from '../forecast/Swell';
import Wind from '../forecast/Wind';
import Arrow from '../icons/Arrow';
import MenuButton from '../buttons/MenuButton';
import FlagButton from '../buttons/FlagButton';
import Menu from '../../Menu';
import { header } from '../forecast/styles';
import api from '../../lib/api';

export default class Hourly extends Component {
  constructor(props) {
    super(props)
    this.state = { visible: false, locations: [] }
  }

  componentDidMount = async () => {
    api.per_page = 15
    const locations_request =  await api.getLocations({ flags: ["&with_cameras=true"] })
    var locations = await locations_request.json()
    this.setState({ locations })
  }

  renderMenu = () => {
    const visible  = !this.state.visible
    this.setState({ visible })
  }

  onFlagPress = () => {
    const { navigation, post } = this.props
    navigation.navigate("Flag", { post: post })
  }

  toggleModal = () => {
    this.setState({ visible: false });
  };

  renderHourly(hourly) {
    const { 
      waveHeight, swellHeight, swellPeriod, 
      optimal_swell, swellDirection, swellDirectionInWord, 
      windSpeed, windDirection, optimal_wind, windDirectionInWord,
    } = hourly

    return (
      <React.Fragment>
        <Swell
          period={swellPeriod} 
          swellHeight={swellHeight} 
          styles={[
            header.text,
            header.shadowHeader,
          ]}
        />
        <Wind 
          windSpeed={windSpeed}
          styles={[
            header.text,
            header.shadowHeader, 
          ]}
        />
      </React.Fragment>
    )
  }

  render() {
    const { location, post } = this.props
    const { visible, locations } = this.state
    const { reported } = post
    const iconColor = reported ? "red" : "white"
    const { name, forecast_info: { hourly, tide_data }} = location
    const { swellHeight } = hourly
    const menu = <Menu navigator={navigator}/>;
    return (
      <React.Fragment>
        <Menu 
          visible={visible} 
          locations={locations}
          toggle={this.toggleModal}
        />
        <View style={styles.container}>
          <MenuButton 
            action={this.renderMenu}
          />
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
          { !!swellHeight && this.renderHourly(hourly) }
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
