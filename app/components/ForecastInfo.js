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
    const { style } = this.props
    if (style == "flexbox") { return styles.flexbox }
    else { return styles.absolute }
  }

  render() {
    return (
      <View style={this._setStyle()}> 
        <Text style={[styles.shadowHeader, styles.overlayText]}>{ this._renderInfo() }</Text>
        { this.props.children } 
      </View>
    )
  }
}
