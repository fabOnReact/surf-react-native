import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Swell from '../forecast/Swell';
import Wind from '../forecast/Wind';
import Arrow from '../icons/Arrow';
import MenuButton from '../buttons/MenuButton';
import FlagButton from '../buttons/FlagButton';
import { header } from '../forecast/styles';
import Api from '../../lib/api';
import Data from '../../lib/data';

export default class Hourly extends Component {
  constructor(props) {
    super(props)
    this.state = { visible: false, locations: [] }
    this.api = new Api()
  }

  componentDidMount = async () => {
    this.api.page = 1
    this.api.per_page = 15
    const locations_request =  await this.api.getLocations({ flags: ["&with_cameras=true"] })
    // console.warn(locations_request);
    const locations = await locations_request.json()
    this.setState({ locations })
  }

  renderMenu = () => {
    const { navigation, imperial } = this.props
    const { locations } = this.state
    navigation.navigate("Menu", { imperial, locations })
  }

  onFlagPress = () => {
    const { navigation, post } = this.props
    navigation.navigate("Flag", { post: post })
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
    const { visible, locations } = this.state
    const with_locations = locations.length > 0
    const { reported } = post
    const iconColor = reported ? "red" : "white"
    const { name, forecast_info: { hourly, tide_data }} = location
    const { swellHeight } = hourly
    const data = new Data({...hourly, imperial })

    return (
      <React.Fragment>
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
          { !!swellHeight && this.renderHourly(data) }
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
