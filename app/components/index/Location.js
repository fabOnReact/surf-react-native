import React, { Component } from 'react';
import { Platform, Text, View, TouchableOpacity, StyleSheet }  from 'react-native';
import Cameras from './Cameras';
import Dimensions from 'Dimensions';
import DeviceInfo from 'react-native-device-info';
import SafeArea from '../SafeArea';
import CamButton from '../buttons/CamButton';
import PostButton from '../buttons/PostButton';
import DisplayButton from '../buttons/DisplayButton';
import { Header } from 'react-navigation';

export default class Location extends Component {
  get attributes() {
    const { location: { data: { attributes }}} = this.props
    return attributes
  }

  get forecastInfo() {
    const { forecast_info } = this.attributes
    return forecast_info
  }

  get hourly() {
    const { hourly } = this.forecastInfo
    return hourly
  }

  get swellHeight() {
    const { swellHeight } = this.hourly
    return swellHeight
  }

  get name() {
    const { name } = this.attributes
    return name
  }
  
  get title() {
    if (!!this.swellHeight) { 
      return `${this.swellHeight} mt. at ${this.name}`
    }
  }

  navigateToForecast = () => {
    const { navigation, locations, location } = this.props
    if(!!this.swellHeight) {
      navigation.navigate('Forecast', { location: location, locations: locations })
    }
  }

  render() {
    const { cameras, changeCamera, changePostIndex, cameraIndex, postIndex, location } = this.props
    const { data: { attributes }} = location
    const previews = cameras
    const camera = cameras[cameraIndex]
    const { attributes: { posts }} = camera
    previews.length = 5
    return (
      <React.Fragment>
        <View
          style={[
            styles.full_screen, 
          ]}>
          <View
            style={[
              styles.flex_evenly,
              styles.absolute,
              styles.cameras,
            ]}>
            {
              previews.map((camera, index) => 
                <CamButton 
                  key={index}
                  index={index}
                  action={changeCamera}
                  selected={cameraIndex}
                />
              )
            }
            <DisplayButton 
              action={this.navigateToForecast} />
          </View>
          <View
            style={[
              styles.flex_evenly,
              styles.absolute,
              styles.posts,
            ]}>
            { 
              posts.map((post, index) => 
                <PostButton 
                  key={index}
                  data={post}
                  action={changePostIndex}
                  index={index}
                  selected={postIndex}
                />
              )
            }
          </View>
        </View>
        <Text 
          style={styles.header}>
            { this.title }
        </Text>
      </React.Fragment>
    )
  }
}

const has_notch = DeviceInfo.hasNotch()
const is_ios = Platform.OS === 'ios'
let deviceH = Dimensions.get('screen').height;
let windowH = Dimensions.get('window').height;
let bottomNavBarH = deviceH - windowH;
const cameraHeight = 150
export const styles = StyleSheet.create({
  full_screen: {
    position: 'absolute',
    top:0,
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: 'red',
  },
  flex_evenly: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
    zIndex: 2,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: is_ios ? cameraHeight : bottomNavBarH + cameraHeight,
  },
  absolute : {
    position: 'absolute', 
    left: 0,
    right: 0,
  },
  cameras: {
    // backgroundColor: 'green',
    bottom: 50,
  },
  posts: {
    // backgroundColor: 'yellow',
    bottom: 0,
    left : 0,
    right: 0,
  },
  header: {
    position: 'absolute',
    top: has_notch ? 0 : 30,
    // width: Dimensions.get('window').width,
    width: "100%",
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    textShadowColor: 'rgb(0, 0, 0)',
    textShadowOffset: {width: -2, height: 2},
    textShadowRadius: 1,
    textAlign: 'center',
    marginBottom: 5,
  }, 
})
