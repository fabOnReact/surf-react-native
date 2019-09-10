import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { styles } from  './styles/ForecastStyles';

export default class ForecastInfo extends Component {
  _renderInfo() {
    const { location } = this.props
    const { forecast_info } = location
    if (forecast_info) { return `${forecast_info.hourly.waveHeight} mt. at ${location.name.slice(0,9)}` }
    else return location.name
  }

  _setStyle() {
    const { display } = this.props
    if (display == "flexbox") { return styles.flexbox }
    else { return styles.absolute }
  }

  render() {
    const { children } = this.props
    return (
      <View style={this._setStyle()}> 
        <Text style={[styles.shadowHeader, styles.overlayText]}>{ this._renderInfo() }</Text>
        { children } 
      </View>
    )
  }
}
