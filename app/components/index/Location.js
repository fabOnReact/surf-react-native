import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet }  from 'react-native';
import Cameras from './Cameras';
import CamButton from '../buttons/CamButton';
import { Header } from 'react-navigation';
// import ForecastInfo from './ForecastInfo';

export default class Location extends Component {
  forecastScreen = () => {
    const { navigation } = this.props
    const { location } = this.props
    const { data: { attributes: location_attributes }} = location
    // if (forecast_info) { 
    //   navigation.navigate('Forecast', { location: location_attributes }) 
    // }
  }

  get withForecast() {
  }

  get location() {
    const { location: { data: { attributes }}} = this.props
    return attributes
  }

  get forecastInfo() {
    const { forecast_info } = this.location
    return forecast_info
  }

  get swellHeight() {
    const { swellHeight } = this.forecastInfo
    return swellHeight
  }

  get name() {
    return this.location.name.slice(0,9)
  }
  
  get title() {
    if (!this.swellHeight) { 
      return `${this.swellHeight} mt. at ${this.name}`
    }
  }

  render() {
    const { location: { included: cameras }} = this.props
    const { camera: { attributes: { posts }}} = this.state
    const { video: { url, poster }} = posts[0]
    return (
      <React.Fragment>
      <TouchableOpacity 
        onPress={this.foreastScreen}>
        <Cameras 
          cameras={cameras} 
        />
        <Card trasparent style={{flex: 1, zIndex: 0}}>
          <Video 
            source={{ uri: url }}
            poster={poster}
            posterResizeMode="cover"
            resizeMode="cover"
            style={styles.video}
            repeat 
            muted 
          />
          <View
            style={styles.button_container}>
            {
              cameras.map((camera, index) => 
                <CamButton 
                  key={index}
                  index={index}
                  action={this.changeCam} />
              )
            }
          </View>
          <Text 
            style={styles.header}>
              { this.title }
          </Text>
        </Card>
      </TouchableOpacity>
      </React.Fragment>
    )
  }
}

export const styles = StyleSheet.create({
})
